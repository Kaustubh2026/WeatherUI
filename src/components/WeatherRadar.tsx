import React from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Layers, 
  Clock, 
  Play, 
  Pause,
  Compass,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface RadarData {
  time: string;
  intensity: number;
  coverage: number;
  type: 'rain' | 'snow' | 'mixed';
}

interface WeatherData {
  radarData: RadarData[];
}

interface WeatherRadarProps {
  weatherData: WeatherData | null;
}

const WeatherRadar: React.FC<WeatherRadarProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const getIntensityColor = (intensity: number) => {
    if (intensity < 0.3) return 'bg-blue-400';
    if (intensity < 0.6) return 'bg-blue-500';
    return 'bg-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* Radar Map */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-blue-400" />
            <span className="text-white">Radar Map</span>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Precipitation</span>
          </div>
        </div>
        <div className="aspect-video bg-white/5 rounded-xl mb-4 relative overflow-hidden">
          {/* Placeholder for actual radar map */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Radar Map Visualization
          </div>
          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <motion.button 
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ZoomOut className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400">Last updated: 5 min ago</span>
          </div>
          <div className="flex space-x-2">
            <motion.button 
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Pause className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Radar Timeline */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Radar Timeline</h3>
        <div className="space-y-4">
          {weatherData.radarData.map((data, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getIntensityColor(data.intensity)}`} />
                <div>
                  <p className="text-white font-medium">{data.time}</p>
                  <p className="text-sm text-gray-400 capitalize">{data.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{Math.round(data.coverage)}%</p>
                <p className="text-sm text-gray-400">Coverage</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Radar Legend */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Radar Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="flex items-center space-x-2 p-3 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
            <span className="text-gray-300">Light Precipitation</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2 p-3 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <span className="text-gray-300">Moderate Precipitation</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2 p-3 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full" />
            <span className="text-gray-300">Heavy Precipitation</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2 p-3 rounded-xl bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-4 h-4 bg-gray-400 rounded-full" />
            <span className="text-gray-300">No Precipitation</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherRadar; 