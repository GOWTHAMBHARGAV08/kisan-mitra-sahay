import React, { useState, useEffect } from 'react';
import { RefreshCw, Calendar, MapPin, Download, Share2, Sun, Cloud, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WeatherCard from '@/components/WeatherCard';
import LocationSelector from '@/components/LocationSelector';
import ApiKeySetup from '@/components/ApiKeySetup';
import { LocationData } from '@/lib/locationService';
import { WeatherService, WeatherForecast } from '@/lib/weatherService';
import { useToast } from '@/hooks/use-toast';

const Weather = () => {
  const [selectedField, setSelectedField] = useState('Field A');
  const [location, setLocation] = useState<LocationData | undefined>();
  const [weatherData, setWeatherData] = useState<WeatherForecast | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();
  
  const fields = ['Field A - Rice', 'Field B - Cotton', 'Field C - Maize'];

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
  };

  const handleLocationChange = async (newLocation: LocationData) => {
    setLocation(newLocation);
    if (apiKey) {
      await fetchWeatherData(newLocation);
    }
  };

  const fetchWeatherData = async (locationData: LocationData) => {
    setIsLoading(true);
    try {
      const forecast = await WeatherService.getWeatherForecast(locationData);
      setWeatherData(forecast);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      toast({
        title: "Weather data unavailable",
        description: "Unable to fetch current weather. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshWeather = () => {
    if (location && apiKey) {
      fetchWeatherData(location);
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    // Map OpenWeather icons to Lucide icons
    if (iconCode.includes('01')) return Sun;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return Cloud;
    if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) return CloudRain;
    return Sun;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* API Key Setup */}
        <ApiKeySetup onApiKeySet={handleApiKeySet} />
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Weather Forecast</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                {weatherData?.current && (
                  <>
                    <span>Updated {weatherData.current.lastUpdated}</span>
                  </>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={handleRefreshWeather}
              disabled={isLoading || !location}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Update</span>
            </Button>
          </div>
          
          {/* Location Selector */}
          <LocationSelector
            onLocationChange={handleLocationChange}
            currentLocation={location}
          />
        </div>

        {/* Current Weather */}
        <WeatherCard data={weatherData?.current} isLoading={isLoading} />

        {/* Field Selection */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <h3 className="font-semibold text-sm text-foreground mb-3">Field-Level Weather</h3>
          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedField === field
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {field}
              </button>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">7-Day Forecast</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="bg-card rounded-xl p-4 shadow-soft animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-4 bg-muted rounded w-20"></div>
                      <div className="w-6 h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-24"></div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="h-4 bg-muted rounded w-8"></div>
                      <div className="h-4 bg-muted rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              (weatherData?.forecast || []).map((day, index) => {
                const Icon = getWeatherIcon(day.icon);
                return (
                  <div key={index} className="bg-card rounded-xl p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-foreground w-20">
                          {day.day}
                        </div>
                        <div className="flex items-center space-x-2">
                          {day.icon ? (
                            <img 
                              src={WeatherService.getWeatherIconUrl(day.icon)}
                              alt={day.condition}
                              className="w-6 h-6"
                            />
                          ) : (
                            <Icon className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {day.tempMin}° - {day.tempMax}°C
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="text-info font-medium">{day.rain}%</div>
                          <div className="text-xs text-muted-foreground">Rain</div>
                        </div>
                        <div className="text-center">
                          <div className="text-muted-foreground font-medium">{day.wind} km/h</div>
                          <div className="text-xs text-muted-foreground">Wind</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Seasonal Outlook */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Seasonal Outlook (3-6 Months)</h2>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Temperature Trends</h3>
                <div className="h-32 bg-gradient-to-r from-danger/10 to-warning/10 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Calendar className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Seasonal Heatmap</p>
                    <p className="text-xs">Above normal temperatures expected</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-3">Rainfall Outlook</h3>
                <div className="h-32 bg-gradient-to-r from-info/10 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <CloudRain className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Monsoon Calendar</p>
                    <p className="text-xs">Normal to above normal rainfall</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-info/10 rounded-xl">
              <h4 className="font-semibold text-sm text-info mb-2">ENSO Status: La Niña</h4>
              <p className="text-xs text-info/80">
                Favorable conditions for monsoon. Consider early sowing for Kharif crops. 
                Harvest window: October 15 - November 30 optimal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Weather;