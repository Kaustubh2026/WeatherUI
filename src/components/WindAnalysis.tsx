import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wind, 
  Compass, 
  Gauge, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface WindData {
  speed: number;
  direction: number;
  gust: number;
  time: string;
}

interface WeatherData {
  windData: WindData[];
}

interface WindAnalysisProps {
  weatherData: WeatherData | null;
}

const WindAnalysis: React.FC<WindAnalysisProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const getDirectionName = (degrees: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="space-y-6">
      {/* Current Wind Stats */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-6">Wind Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            className="p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Current Speed</span>
            </div>
            <p className="text-3xl font-bold text-white">{weatherData.windData[0].speed} km/h</p>
          </motion.div>
          <motion.div 
            className="p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Compass className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Direction</span>
            </div>
            <p className="text-3xl font-bold text-white">{getDirectionName(weatherData.windData[0].direction)}</p>
            <p className="text-sm text-gray-400">{weatherData.windData[0].direction}°</p>
          </motion.div>
          <motion.div 
            className="p-4 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Gust Speed</span>
            </div>
            <p className="text-3xl font-bold text-white">{weatherData.windData[0].gust} km/h</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Wind Forecast */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Wind Forecast</h3>
        <div className="space-y-4">
          {weatherData.windData.map((data, index) => (
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
                  <motion.div
                    style={{ transform: `rotate(${data.direction}deg)` }}
                    animate={{ rotate: data.direction }}
                    transition={{ duration: 0.5 }}
                  >
                    <ArrowUpRight className="w-6 h-6 text-blue-400" />
                  </motion.div>
                </div>
                <div>
                  <p className="text-white font-medium">{data.time}</p>
                  <p className="text-sm text-gray-400">{getDirectionName(data.direction)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-white font-medium">
                  {data.speed} km/h
                </div>
                <div className="text-gray-400">
                  Gust: {data.gust} km/h
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Wind Patterns */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Wind Patterns</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Daily Pattern</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-gray-300">
              Winds are expected to increase throughout the day, peaking in the afternoon
              with gusts up to 20 km/h. Evening winds will gradually decrease.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Weekly Trend</span>
              <ArrowUpRight className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-gray-300">
              Wind speeds are forecasted to increase over the next few days,
              with stronger gusts expected on Thursday and Friday.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WindAnalysis; 