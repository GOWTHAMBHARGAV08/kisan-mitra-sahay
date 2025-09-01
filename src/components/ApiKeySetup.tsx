import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    // Check if API key is already stored
    const storedKey = localStorage.getItem('openweather_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      onApiKeySet(storedKey);
    }
  }, [onApiKeySet]);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    try {
      // Validate the API key by making a test request
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=16.3067&lon=80.4365&appid=${apiKey.trim()}`
      );
      
      if (response.ok) {
        localStorage.setItem('openweather_api_key', apiKey.trim());
        onApiKeySet(apiKey.trim());
      } else {
        throw new Error('Invalid API key');
      }
    } catch (error) {
      alert('Invalid API key. Please check and try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('openweather_api_key');
    setApiKey('');
    onApiKeySet('');
  };

  const storedKey = localStorage.getItem('openweather_api_key');

  if (storedKey) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>Weather API Connected</span>
          </CardTitle>
          <CardDescription>
            OpenWeatherMap API key is configured and ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" onClick={handleRemoveKey}>
            Update API Key
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
      <CardHeader>
        <CardTitle className="text-sm flex items-center space-x-2 text-yellow-700 dark:text-yellow-300">
          <Key className="w-4 h-4" />
          <span>Weather API Setup Required</span>
        </CardTitle>
        <CardDescription className="text-yellow-600 dark:text-yellow-400">
          To get real-time weather data, please enter your OpenWeatherMap API key.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your OpenWeatherMap API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button
            onClick={handleSaveKey}
            disabled={!apiKey.trim() || isValidating}
            size="sm"
          >
            {isValidating ? 'Validating...' : 'Save'}
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            Don't have an API key? 
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto ml-1 text-xs"
              onClick={() => window.open('https://openweathermap.org/api', '_blank')}
            >
              Get one free from OpenWeatherMap
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </p>
          <p className="text-yellow-600 dark:text-yellow-400">
            Your API key is stored locally in your browser and never shared.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeySetup;