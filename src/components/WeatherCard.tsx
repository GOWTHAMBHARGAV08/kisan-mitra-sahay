import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData } from '@/lib/weatherService';

interface WeatherCardProps {
  data?: WeatherData;
  isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isLoading }) => {
  const defaultData: WeatherData = {
    location: "Guntur, Andhra Pradesh",
    temperature: 32,
    feelsLike: 36,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    rainChance: 30,
    lastUpdated: "2 mins ago",
    icon: "02d"
  };

  const weatherData = data || defaultData;
  if (isLoading) {
    return (
      <div className="weather-card bg-gradient-to-br from-primary to-primary-light text-primary-foreground animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <div className="h-6 bg-white/20 rounded w-32"></div>
            <div className="h-4 bg-white/20 rounded w-24"></div>
          </div>
          <div className="h-12 w-12 bg-white/20 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-10 bg-white/20 rounded w-20"></div>
            <div className="h-4 bg-white/20 rounded w-24"></div>
            <div className="h-5 bg-white/20 rounded w-28"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/20">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center space-y-1">
              <div className="h-5 bg-white/20 rounded mx-auto w-5"></div>
              <div className="h-4 bg-white/20 rounded w-8 mx-auto"></div>
              <div className="h-3 bg-white/20 rounded w-12 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) return CloudRain;
    if (condition.toLowerCase().includes('cloud')) return Cloud;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(weatherData.condition);

  return (
      <div className="weather-card bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">{weatherData.location}</h2>
            <p className="text-primary-foreground/80 text-sm">Updated {weatherData.lastUpdated}</p>
          </div>
          <div className="flex items-center">
            {weatherData.icon ? (
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.condition}
                className="w-12 h-12"
              />
            ) : (
              <WeatherIcon className="w-12 h-12 text-primary-foreground/90" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-4xl font-bold">{weatherData.temperature}°C</div>
            <p className="text-primary-foreground/80">Feels like {weatherData.feelsLike}°C</p>
            <p className="text-primary-foreground/90 font-medium capitalize">{weatherData.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/20">
          <div className="text-center">
            <Droplets className="w-5 h-5 mx-auto mb-1 text-primary-foreground/80" />
            <div className="text-sm font-medium">{weatherData.rainChance}%</div>
            <div className="text-xs text-primary-foreground/70">Rain</div>
          </div>
          <div className="text-center">
            <Wind className="w-5 h-5 mx-auto mb-1 text-primary-foreground/80" />
            <div className="text-sm font-medium">{weatherData.windSpeed} km/h</div>
            <div className="text-xs text-primary-foreground/70">Wind</div>
          </div>
          <div className="text-center">
            <Thermometer className="w-5 h-5 mx-auto mb-1 text-primary-foreground/80" />
            <div className="text-sm font-medium">{weatherData.humidity}%</div>
            <div className="text-xs text-primary-foreground/70">Humidity</div>
          </div>
        </div>
      </div>
  );
};

export default WeatherCard;