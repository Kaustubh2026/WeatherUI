import React from 'react';
import { AlertCircle, Wind, CloudRain, CloudLightning, Thermometer } from 'lucide-react';

interface Alert {
  type: 'wind' | 'rain' | 'storm' | 'temperature';
  severity: 'low' | 'medium' | 'high';
  message: string;
  time: string;
}

const Alerts: React.FC = () => {
  // Mock alerts data - replace with actual API data
  const alerts: Alert[] = [
    {
      type: 'wind',
      severity: 'high',
      message: 'Strong winds expected in the next 24 hours',
      time: '2 hours ago'
    },
    {
      type: 'rain',
      severity: 'medium',
      message: 'Heavy rainfall warning for tomorrow',
      time: '5 hours ago'
    },
    {
      type: 'temperature',
      severity: 'low',
      message: 'Temperature drop expected overnight',
      time: '1 day ago'
    }
  ];

  const getIcon = (type: Alert['type']) => {
    switch (type) {
      case 'wind': return Wind;
      case 'rain': return CloudRain;
      case 'storm': return CloudLightning;
      case 'temperature': return Thermometer;
      default: return AlertCircle;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500';
    }
  };

  return (
    <div className="h-full w-full bg-[#030711] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Weather Alerts</h2>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors">
            All Alerts
          </button>
          <button className="px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors">
            Active Only
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = getIcon(alert.type);
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start">
                <Icon className="h-6 w-6 mr-3 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">{alert.type} Alert</h3>
                    <span className="text-sm opacity-75">{alert.time}</span>
                  </div>
                  <p className="mt-1">{alert.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Settings */}
      <div className="mt-8 bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Alert Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Severe Weather Alerts</h4>
              <p className="text-gray-400 text-sm">Get notified about severe weather conditions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Daily Forecast Alerts</h4>
              <p className="text-gray-400 text-sm">Receive daily weather updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts; 