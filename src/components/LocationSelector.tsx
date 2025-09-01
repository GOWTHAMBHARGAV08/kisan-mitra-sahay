import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LocationService, LocationData, ManualLocationData } from '@/lib/locationService';
import { useToast } from '@/hooks/use-toast';

interface LocationSelectorProps {
  onLocationChange: (location: LocationData) => void;
  currentLocation?: LocationData;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  onLocationChange, 
  currentLocation 
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualInput, setManualInput] = useState<ManualLocationData>({
    city: '',
    district: '',
    state: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Try to detect location on component mount if no location is set
    if (!currentLocation) {
      handleDetectLocation();
    }
  }, []);

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    try {
      const location = await LocationService.getCurrentLocation();
      onLocationChange(location);
      setShowManualInput(false);
      toast({
        title: "Location detected",
        description: `Found your location: ${location.city || 'Current position'}`,
      });
    } catch (error) {
      console.error('Location detection failed:', error);
      setShowManualInput(true);
      toast({
        title: "Location detection failed",
        description: "Please enter your location manually",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  const handleManualSearch = async () => {
    if (!manualInput.city.trim()) {
      toast({
        title: "City required",
        description: "Please enter at least your city name",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      const location = await LocationService.getLocationFromCity(manualInput);
      onLocationChange(location);
      setShowManualInput(false);
      toast({
        title: "Location found",
        description: `Set location to: ${location.city}, ${location.state}`,
      });
    } catch (error) {
      console.error('Manual location search failed:', error);
      toast({
        title: "Location not found",
        description: "Please check your city/district name and try again",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const displayLocation = currentLocation 
    ? `${currentLocation.city || 'Current location'}${currentLocation.state ? ', ' + currentLocation.state : ''}`
    : 'Location not set';

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-sm">
        <MapPin className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground font-medium">{displayLocation}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDetectLocation}
          disabled={isDetecting}
          className="h-6 px-2"
        >
          <Navigation className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowManualInput(!showManualInput)}
          className="h-6 px-2"
        >
          <Search className="w-3 h-3" />
        </Button>
      </div>

      {showManualInput && (
        <div className="bg-card p-4 rounded-lg shadow-soft space-y-3">
          <h4 className="font-medium text-sm text-foreground">Enter your location</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              placeholder="City *"
              value={manualInput.city}
              onChange={(e) => setManualInput(prev => ({ ...prev, city: e.target.value }))}
              className="text-sm"
            />
            <Input
              placeholder="District"
              value={manualInput.district}
              onChange={(e) => setManualInput(prev => ({ ...prev, district: e.target.value }))}
              className="text-sm"
            />
            <Input
              placeholder="State"
              value={manualInput.state}
              onChange={(e) => setManualInput(prev => ({ ...prev, state: e.target.value }))}
              className="text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleManualSearch}
              disabled={isSearching || !manualInput.city.trim()}
              size="sm"
            >
              {isSearching ? 'Searching...' : 'Find Location'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowManualInput(false)}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;