import React from 'react';
import { MapPin, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherMapProps {
  lat: number;
  lon: number;
  weatherData: any;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, weatherData }) => {
  return (
    <div className="h-full w-full bg-[#030711] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Weather Map</h2>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors">
            Satellite
          </button>
          <button className="px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors">
            Temperature
          </button>
          <button className="px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors">
            Precipitation
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[600px] bg-gray-900 rounded-xl overflow-hidden">
        {/* This would be replaced with an actual map component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-white text-lg">Map integration coming soon</p>
          </div>
        </div>

        {/* Weather Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-300">Temperature</p>
                <p className="text-lg font-semibold text-white">
                  {Math.round(weatherData?.main?.temp || 0)}°C
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-300">Wind Speed</p>
                <p className="text-lg font-semibold text-white">
                  {Math.round((weatherData?.wind?.speed || 0) * 2.237)} mph
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Droplets className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-300">Humidity</p>
                <p className="text-lg font-semibold text-white">
                  {weatherData?.main?.humidity || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors">
            Zoom In
          </button>
          <button className="p-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors">
            Zoom Out
          </button>
        </div>
        <div className="text-sm text-gray-400">
          Coordinates: {lat.toFixed(4)}, {lon.toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export default WeatherMap; 