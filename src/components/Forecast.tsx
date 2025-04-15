import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudFog,
  ArrowUp,
  ArrowDown,
  Droplets,
  Thermometer,
  Wind
} from 'lucide-react';

interface ForecastData {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  wind: number;
}

interface WeatherData {
  forecast: ForecastData[];
}

interface ForecastProps {
  weatherData: WeatherData | null;
}

const Forecast: React.FC<ForecastProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning className="w-8 h-8 text-purple-400" />;
      case 'fog':
        return <CloudFog className="w-8 h-8 text-gray-300" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">5-Day Forecast</h2>
        <div className="space-y-4">
          {weatherData.forecast.map((day, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {getWeatherIcon(day.condition)}
                </div>
                <div>
                  <p className="text-white font-medium">{day.day}</p>
                  <p className="text-sm text-gray-400">{day.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <ArrowUp className="w-4 h-4 text-red-400" />
                  <span className="text-white font-medium">{day.high}°</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">{day.low}°</span>
                </div>
                <div className="w-24">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Precip</span>
                    <span>{day.precipitation}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${day.precipitation}%` }}
                    />
                  </div>
                </div>
                <div className="text-gray-400">
                  <Wind className="w-5 h-5 inline mr-1" />
                  {day.wind} km/h
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hourly Forecast */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Hourly Forecast</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {Array.from({ length: 24 }, (_, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 min-w-[80px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gray-400 text-sm">
                  {i % 12 === 0 ? '12' : i % 12}{i < 12 ? 'AM' : 'PM'}
                </span>
                <Sun className="w-6 h-6 text-yellow-400 my-2" />
                <span className="text-white font-medium">22°</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Weather Insights */}
      <div className="mt-8 bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Weather Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">Temperature Trend</h4>
            <p className="text-gray-300">
              Temperatures are expected to remain stable over the next week, with a slight increase towards the weekend.
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-lg font-medium text-white mb-2">Precipitation Outlook</h4>
            <p className="text-gray-300">
              Light rain expected mid-week, clearing up by Friday. Overall precipitation levels below seasonal average.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast; 