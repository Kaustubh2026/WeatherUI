import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  MapPin
} from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
}

interface CurrentWeatherProps {
  weatherData: WeatherData | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="space-y-6">
      {/* Location and Main Weather */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-blue-400 mr-2" />
          <h2 className="text-2xl font-semibold text-white">{weatherData.location}</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <motion.div 
              className="text-6xl font-bold text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {weatherData.temperature}°
            </motion.div>
            <p className="text-blue-400 capitalize">{weatherData.description}</p>
          </div>
          <motion.div
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Feels like {weatherData.feelsLike}°
          </motion.div>
        </div>
      </motion.div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WeatherDetail 
          icon={Droplets}
          title="Humidity"
          value={`${weatherData.humidity}%`}
          color="text-blue-400"
        />
        <WeatherDetail 
          icon={Wind}
          title="Wind"
          value={`${weatherData.windSpeed} km/h`}
          color="text-blue-400"
        />
        <WeatherDetail 
          icon={Eye}
          title="Visibility"
          value={`${weatherData.visibility} km`}
          color="text-blue-400"
        />
        <WeatherDetail 
          icon={Gauge}
          title="Pressure"
          value={`${weatherData.pressure} hPa`}
          color="text-blue-400"
        />
      </div>

      {/* Sun Position */}
      <motion.div 
        className="backdrop-blur-md bg-white/10 rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-around">
          <div className="flex items-center space-x-4">
            <Sunrise className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Sunrise</p>
              <p className="text-xl font-semibold text-white">{weatherData.sunrise}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Sunset className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-sm text-gray-400">Sunset</p>
              <p className="text-xl font-semibold text-white">{weatherData.sunset}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WeatherDetail: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  value: string;
  color: string;
}> = ({ icon: Icon, title, value, color }) => {
  return (
    <motion.div 
      className="backdrop-blur-md bg-white/10 rounded-xl p-4 shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2">
        <Icon className={`w-5 h-5 mr-2 ${color}`} />
        <h4 className="text-sm text-gray-400">{title}</h4>
      </div>
      <p className="text-xl font-semibold text-white">{value}</p>
    </motion.div>
  );
};

export default CurrentWeather; 