export interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
}

export interface ManualLocationData {
  city: string;
  state?: string;
  district?: string;
}

export class LocationService {
  static async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Reverse geocoding to get city/state info
            const locationDetails = await this.reverseGeocode(latitude, longitude);
            resolve({
              latitude,
              longitude,
              ...locationDetails
            });
          } catch (error) {
            // Even if reverse geocoding fails, we have coordinates
            resolve({ latitude, longitude });
          }
        },
        (error) => {
          reject(new Error(`Location access denied: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  static async getLocationFromCity(manualLocation: ManualLocationData): Promise<LocationData> {
    const apiKey = this.getApiKey();
    const query = `${manualLocation.city}${manualLocation.district ? ', ' + manualLocation.district : ''}${manualLocation.state ? ', ' + manualLocation.state : ''}, India`;
    
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to find location coordinates');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error('Location not found');
    }
    
    const location = data[0];
    return {
      latitude: location.lat,
      longitude: location.lon,
      city: location.name,
      state: location.state,
      country: location.country
    };
  }

  private static async reverseGeocode(latitude: number, longitude: number): Promise<Partial<LocationData>> {
    try {
      const apiKey = this.getApiKey();
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Reverse geocoding failed');
      }
      
      const data = await response.json();
      
      if (data.length > 0) {
        const location = data[0];
        return {
          city: location.name,
          state: location.state,
          country: location.country
        };
      }
      
      return {};
    } catch (error) {
      console.warn('Reverse geocoding failed:', error);
      return {};
    }
  }

  private static getApiKey(): string {
    const apiKey = localStorage.getItem('openweather_api_key');
    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not found. Please set up your API key.');
    }
    return apiKey;
  }
}