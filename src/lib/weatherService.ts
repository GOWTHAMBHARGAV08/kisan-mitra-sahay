import { LocationData } from './locationService';

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  lastUpdated: string;
  icon: string;
}

export interface ForecastDay {
  day: string;
  date: string;
  tempMin: number;
  tempMax: number;
  rain: number;
  wind: number;
  condition: string;
  icon: string;
}

export interface WeatherForecast {
  current: WeatherData;
  forecast: ForecastDay[];
}

export class WeatherService {
  private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  static async getCurrentWeather(location: LocationData): Promise<WeatherData> {
    const apiKey = this.getApiKey();
    const response = await fetch(
      `${this.BASE_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    return {
      location: location.city || `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      rainChance: data.rain ? Math.round((data.rain['1h'] || 0) * 10) : 0, // Rough conversion
      lastUpdated: new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      icon: data.weather[0].icon
    };
  }

  static async getWeatherForecast(location: LocationData): Promise<WeatherForecast> {
    const apiKey = this.getApiKey();
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`${this.BASE_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`),
      fetch(`${this.BASE_URL}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Failed to fetch weather forecast');
    }

    const [currentData, forecastData] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json()
    ]);

    const current: WeatherData = {
      location: location.city || `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`,
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      condition: currentData.weather[0].description,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6),
      rainChance: currentData.rain ? Math.round((currentData.rain['1h'] || 0) * 10) : 0,
      lastUpdated: new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      icon: currentData.weather[0].icon
    };

    // Process 5-day forecast (take one reading per day around noon)
    const dailyForecasts = this.processForecastData(forecastData.list);

    return {
      current,
      forecast: dailyForecasts
    };
  }

  private static processForecastData(forecastList: any[]): ForecastDay[] {
    const dailyData: { [key: string]: any[] } = {};
    
    // Group forecasts by date
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    // Get daily summaries (max 7 days)
    const days = Object.keys(dailyData).slice(0, 7);
    
    return days.map((dateString, index) => {
      const dayData = dailyData[dateString];
      const date = new Date(dateString);
      
      // Find midday forecast or closest to it
      const middayForecast = dayData.reduce((closest, current) => {
        const currentHour = new Date(current.dt * 1000).getHours();
        const closestHour = new Date(closest.dt * 1000).getHours();
        return Math.abs(currentHour - 12) < Math.abs(closestHour - 12) ? current : closest;
      });

      // Calculate daily min/max temperatures
      const temps = dayData.map(item => item.main.temp);
      const tempMin = Math.round(Math.min(...temps));
      const tempMax = Math.round(Math.max(...temps));

      // Calculate average wind speed
      const avgWind = Math.round(dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length * 3.6);

      // Calculate rain probability (simplified)
      const rainChance = Math.round(dayData.reduce((sum, item) => {
        return sum + (item.rain ? (item.rain['3h'] || 0) * 10 : 0);
      }, 0) / dayData.length);

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayNames[date.getDay()];

      return {
        day: dayName,
        date: date.toLocaleDateString('en-IN'),
        tempMin,
        tempMax,
        rain: Math.min(rainChance, 100),
        wind: avgWind,
        condition: middayForecast.weather[0].description,
        icon: middayForecast.weather[0].icon
      };
    });
  }

  static getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  private static getApiKey(): string {
    const apiKey = localStorage.getItem('openweather_api_key');
    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not found. Please set up your API key.');
    }
    return apiKey;
  }
}