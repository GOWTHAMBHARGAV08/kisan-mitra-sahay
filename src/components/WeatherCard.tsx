import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainChance: number;
  lastUpdated: string;
}

interface WeatherCardProps {
  data?: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  data = {
    location: "Guntur, Andhra Pradesh",
    temperature: 32,
    feelsLike: 36,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    rainChance: 30,
    lastUpdated: "2 mins ago"
  }
}) => {
  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) return CloudRain;
    if (condition.toLowerCase().includes('cloud')) return Cloud;
    return Sun;
  };

  const WeatherIcon = getWeatherIcon(data.condition);

  return (
    <div className="weather-card bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">{data.location}</h2>
          <p className="text-primary-foreground/80 text-sm">Updated {data.lastUpdated}</p>
        </div>
        <WeatherIcon className="w-12 h-12 text-primary-foreground/90" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-4xl font-bold">{data.temperature}°C</div>
          <p className="text-primary-foreground/80">Feels like {data.feelsLike}°C</p>
          <p className="text-primary-foreground/90 font-medium">{data.condition}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/20">
        <div className="text-center">
          <Droplets className="w-5 h-5 mx-auto mb-1 text-primary-foreground/80" />
          <div className="text-sm font-medium">{data.rainChance}%</div>
          <div className="text-xs text-primary-foreground/70">Rain</div>
        </div>
        <div className="text-center">
          <Wind className="w-5 h-5 mx-auto mb-1 text-primary-foreground/80" />
          <div className="text-sm font-medium">{data.windSpeed} km/h</div>
          <div className="text-xs text-primary-foreground/70">Wind</div>
        </div>
        <div className="text-center">
          <Thermometer className="w-5 h-5 mx-auto mb-1 text-primary-foreground/80" />
          <div className="text-sm font-medium">{data.humidity}%</div>
          <div className="text-xs text-primary-foreground/70">Humidity</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;