import React from 'react';
import { 
  Home, 
  Map, 
  Calendar, 
  Settings, 
  AlertCircle, 
  Wind, 
  Droplets, 
  Sun, 
  CloudRain,
  Thermometer,
  Compass
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' },
    { icon: Map, label: 'Weather Map', page: 'map' },
    { icon: Calendar, label: 'Forecast', page: 'forecast' },
    { icon: AlertCircle, label: 'Alerts', page: 'alerts' },
    { icon: Wind, label: 'Wind Analysis', page: 'wind' },
    { icon: Droplets, label: 'Precipitation', page: 'precipitation' },
    { icon: Sun, label: 'UV Index', page: 'uv' },
    { icon: CloudRain, label: 'Air Quality', page: 'air-quality' },
    { icon: Thermometer, label: 'Temperature Trends', page: 'temperature' },
    { icon: Compass, label: 'Weather Radar', page: 'radar' },
    { icon: Settings, label: 'Settings', page: 'settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#030711] border-r border-gray-800 p-4">
      <div className="flex items-center mb-8">
        <Thermometer className="h-8 w-8 text-blue-500 mr-2" />
        <h1 className="text-xl font-bold text-white">WeatherLens</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.page}
              onClick={() => onPageChange(item.page)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activePage === item.page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 