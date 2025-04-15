import React from 'react';
import { motion } from 'framer-motion';
import { 
  Droplet, 
  Snowflake, 
  CloudRain, 
  CloudSnow,
  Clock,
  TrendingUp
} from 'lucide-react';

interface PrecipitationData {
  type: 'rain' | 'snow' | 'none';
  amount: number;
  probability: number;
  time: string;
}

interface WeatherData {
  precipitationData: PrecipitationData[];
}

interface PrecipitationProps {
  weatherData: WeatherData | null;
}

const Precipitation: React.FC<PrecipitationProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const getPrecipitationIcon = (type: string) => {
    switch (type) {
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-6 h-6 text-blue-200" />;
      default:
        return <Droplet className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Precipitation Stats */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Precipitation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            className="p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Droplet className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Current</span>
            </div>
            <p className="text-3xl font-bold text-white">{weatherData.precipitationData[0].amount} mm</p>
            <p className="text-sm text-gray-400">Light rain</p>
          </motion.div>
          <motion.div 
            className="p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <CloudRain className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Today</span>
            </div>
            <p className="text-3xl font-bold text-white">2.1 mm</p>
            <p className="text-sm text-gray-400">Total rainfall</p>
          </motion.div>
          <motion.div 
            className="p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Snowflake className="w-5 h-5 text-blue-200" />
              <span className="text-gray-400">Snow</span>
            </div>
            <p className="text-3xl font-bold text-white">0.1 cm</p>
            <p className="text-sm text-gray-400">Light snow</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Precipitation Forecast */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Precipitation Forecast</h3>
        <div className="space-y-4">
          {weatherData.precipitationData.map((data, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                {getPrecipitationIcon(data.type)}
                <div>
                  <p className="text-white font-medium">{data.time}</p>
                  <p className="text-sm text-gray-400">
                    {data.type === 'none' ? 'No precipitation' : `${data.type} - ${data.amount} mm`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{data.probability}%</p>
                <p className="text-sm text-gray-400">Chance</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Precipitation Patterns */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Precipitation Patterns</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Daily Pattern</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-gray-300">
              Light rain expected throughout the day with increasing intensity in the afternoon.
              Snow showers possible in the evening hours.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Weekly Trend</span>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-gray-300">
              Weekly forecast shows alternating periods of rain and dry weather,
              with the highest precipitation expected on Thursday.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Precipitation; 