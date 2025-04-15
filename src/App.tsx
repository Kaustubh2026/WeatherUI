import React, { useState, useEffect } from 'react';
import { Search, Sun, Cloud, Moon, Wind, Droplet, Map, Globe, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  timestamp: number;
  aqi: {
    value: number;
    category: string;
    mainPollutant: string;
    components: {
      pm2_5: number;
      pm10: number;
      no2: number;
      o3: number;
      so2: number;
      co: number;
    };
  };
  forecast: Array<{
    day: string;
    date: string;
    timestamp: number;
    temp: number;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
    wind: number;
  }>;
  windData: Array<{
    speed: number;
    direction: number;
    gust: number;
    time: string;
  }>;
  precipitationData: Array<{
    type: 'rain' | 'snow' | 'none';
    amount: number;
    probability: number;
    time: string;
  }>;
  radarData: Array<{
    time: string;
    intensity: number;
    coverage: number;
    type: 'rain' | 'snow' | 'mixed';
  }>;
}

// Add type definition for time of day
type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

// Add more detailed time of day detection
const getTimeOfDay = (hour: number): TimeOfDay => {
  // Ensure we're working with 24-hour format
  const h = hour % 24;
  
  // Morning: 6 AM to 11:59 AM
  if (h >= 6 && h < 12) return 'morning';
  
  // Afternoon: 12 PM to 4:59 PM
  if (h >= 12 && h < 17) return 'afternoon';
  
  // Evening: 5 PM to 7:59 PM
  if (h >= 17 && h < 20) return 'evening';
  
  // Night: 8 PM to 5:59 AM
  return 'night';
};

const getWeatherBackground = (condition: string, datetime: string) => {
  const hour = new Date(datetime).getHours();
  const timeOfDay = getTimeOfDay(hour);
  console.log('Time detection:', { hour, timeOfDay }); // Debug log

  switch (condition.toLowerCase()) {
    case 'clear':
      switch (timeOfDay) {
        case 'morning':
          return 'url("https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=80")'; // Bright sunrise over mountains
        case 'afternoon':
          return 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80")'; // Bright sunny mountains
        case 'evening':
          return 'url("https://images.unsplash.com/photo-1494243762909-b498c7e440a9?auto=format&fit=crop&w=2000&q=80")'; // Golden hour mountains
        case 'night':
          return 'url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2000&q=80")'; // Starry night with bright moon and stars
      }
      break;

    case 'clouds':
      switch (timeOfDay) {
        case 'morning':
          return 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80")'; // Morning clouds mountains
        case 'afternoon':
          return 'url("https://images.unsplash.com/photo-1572763961923-21de3b3e3c88?auto=format&fit=crop&w=2000&q=80")'; // Cloudy mountain peaks
        case 'evening':
          return 'url("https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=2000&q=80")'; // Evening clouds
        case 'night':
          return 'url("https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80")'; // Night clouds
      }
      break;

    case 'rain':
      switch (timeOfDay) {
        case 'morning':
          return 'url("https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=2000&q=80")'; // Morning rain
        case 'afternoon':
          return 'url("https://images.unsplash.com/photo-1493314894560-5c412a56c17c?auto=format&fit=crop&w=2000&q=80")'; // Afternoon rain
        case 'evening':
          return 'url("https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2000&q=80")'; // Evening rain
        case 'night':
          return 'url("https://images.unsplash.com/photo-1509635022432-0220ac12960b?auto=format&fit=crop&w=2000&q=80")'; // Night rain
      }
      break;

    case 'snow':
      switch (timeOfDay) {
        case 'morning':
          return 'url("https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&w=2000&q=80")'; // Morning snow
        case 'afternoon':
          return 'url("https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=2000&q=80")'; // Afternoon snow
        case 'evening':
          return 'url("https://images.unsplash.com/photo-1507181080368-cc2195abacdf?auto=format&fit=crop&w=2000&q=80")'; // Evening snow
        case 'night':
          return 'url("https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=2000&q=80")'; // Night snow
      }
      break;

    case 'thunderstorm':
      switch (timeOfDay) {
        case 'morning':
          return 'url("https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=2000&q=80")'; // Morning storm
        case 'afternoon':
          return 'url("https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=2000&q=80")'; // Afternoon storm
        case 'evening':
          return 'url("https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&w=2000&q=80")'; // Evening storm
        case 'night':
          return 'url("https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?auto=format&fit=crop&w=2000&q=80")'; // Night storm
      }
      break;

    default:
      return 'url("https://images.unsplash.com/photo-1682686580391-615b1e32be1f?auto=format&fit=crop&w=2000&q=80")'; // Default to bright day
  }

  // Default background based on time of day
  switch (timeOfDay) {
    case 'morning':
      return 'url("https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=80")'; // Default morning
    case 'afternoon':
      return 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80")'; // Default afternoon
    case 'evening':
      return 'url("https://images.unsplash.com/photo-1494243762909-b498c7e440a9?auto=format&fit=crop&w=2000&q=80")'; // Default evening
    case 'night':
      return 'url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2000&q=80")'; // Default night
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Temperature conversion functions
  const celsiusToFahrenheit = (celsius: number) => Math.round(celsius * 9/5 + 32);
  const getTemperature = (celsius: number) => tempUnit === 'C' ? celsius : celsiusToFahrenheit(celsius);

  // Tabs configuration
  const tabs = [
    { id: 'current', icon: <Sun />, label: 'Current' },
    { id: 'forecast', icon: <Cloud />, label: 'Weather Vibes' },
    { id: 'wind', icon: <Wind />, label: 'Wind' },
    { id: 'precipitation', icon: <Droplet />, label: 'Precipitation' },
    { id: 'radar', icon: <Map />, label: 'Radar' },
  ];

  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, get the weather data to obtain coordinates
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery || 'London,UK'}&units=metric&appid=8ff8942804f03ac79850560db9d045ef`
        );
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
          throw new Error(weatherData.message || 'Failed to fetch weather data');
        }

        // Get coordinates from the weather data
        const lat = weatherData.city.coord.lat;
        const lon = weatherData.city.coord.lon;

        // Then fetch AQI data using the coordinates
        const aqiResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=8ff8942804f03ac79850560db9d045ef`
        );
        const aqiData = await aqiResponse.json();

        if (!aqiResponse.ok) {
          throw new Error('Failed to fetch air quality data');
        }

        // Update state with combined data
        setWeatherData({
          location: `${weatherData.city.name}, ${weatherData.city.country}`,
          temperature: Math.round(weatherData.list[0].main.temp),
          condition: weatherData.list[0].weather[0].main,
          description: weatherData.list[0].weather[0].description,
          humidity: weatherData.list[0].main.humidity,
          windSpeed: Math.round(weatherData.list[0].wind.speed * 3.6),
          visibility: Math.round(weatherData.list[0].visibility / 1000),
          pressure: weatherData.list[0].main.pressure,
          sunrise: new Date(weatherData.city.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          sunset: new Date(weatherData.city.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          timestamp: weatherData.list[0].dt,
          aqi: {
            value: aqiData.list[0].main.aqi,
            category: getAQICategory(aqiData.list[0].main.aqi),
            mainPollutant: getMainPollutant(aqiData.list[0].components),
            components: aqiData.list[0].components
          },
          forecast: weatherData.list.filter((_: any, index: number) => index % 8 === 0).map((day: any) => ({
            day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            date: new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            timestamp: day.dt,
            temp: Math.round(day.main.temp),
            high: Math.round(day.main.temp_max),
            low: Math.round(day.main.temp_min),
            condition: day.weather[0].main.toLowerCase(),
            precipitation: day.pop * 100,
            wind: Math.round(day.wind.speed * 3.6)
          })),
          windData: weatherData.list.slice(0, 8).map((hour: any) => ({
            speed: Math.round(hour.wind.speed * 3.6),
            direction: hour.wind.deg,
            gust: Math.round(hour.wind.gust * 3.6),
            time: new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })
          })),
          precipitationData: weatherData.list.slice(0, 8).map((hour: any) => ({
            type: hour.weather[0].main.toLowerCase().includes('rain') ? 'rain' : 
                  hour.weather[0].main.toLowerCase().includes('snow') ? 'snow' : 'none',
            amount: hour.rain ? hour.rain['3h'] || 0 : hour.snow ? hour.snow['3h'] || 0 : 0,
            probability: hour.pop * 100,
            time: new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })
          })),
          radarData: weatherData.list.slice(0, 8).map((hour: any) => ({
            time: new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
            intensity: hour.rain ? hour.rain['3h'] || 0 : hour.snow ? hour.snow['3h'] || 0 : 0,
            coverage: hour.clouds.all,
            type: hour.weather[0].main.toLowerCase().includes('rain') ? 'rain' : 
                  hour.weather[0].main.toLowerCase().includes('snow') ? 'snow' : 'mixed'
          }))
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [searchQuery]);

  // Update background based on weather condition
  useEffect(() => {
    if (weatherData?.condition) {
      const locationTime = new Date(weatherData.timestamp * 1000);
      const locationHour = locationTime.getHours();
      const timeOfDay = getTimeOfDay(locationHour);
      
      const background = getWeatherBackground(weatherData.condition, locationTime.toISOString());
      
      // Apply background directly to the weather-app element with no transitions
      const weatherApp = document.querySelector('.weather-app') as HTMLDivElement;
      if (weatherApp) {
        // Remove any existing transition-related styles
        weatherApp.style.removeProperty('transition');
        weatherApp.style.removeProperty('animation');
        weatherApp.style.removeProperty('-webkit-transition');
        weatherApp.style.removeProperty('-moz-transition');
        weatherApp.style.removeProperty('-o-transition');
        weatherApp.style.removeProperty('-ms-transition');
        
        // Set the background immediately without transitions
        weatherApp.style.cssText = `
          background-image: ${background};
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: none !important;
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          animation: none !important;
        `;
        
        // Force a repaint to prevent transition
        weatherApp.offsetHeight;
        
        weatherApp.setAttribute('data-time', timeOfDay);
      }
      
      document.documentElement.setAttribute('data-weather', weatherData.condition.toLowerCase());
      document.documentElement.setAttribute('data-time', timeOfDay);
    }
  }, [weatherData?.condition, weatherData?.timestamp]);

  const renderContent = () => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (!weatherData) {
      return null;
    }

    switch (activeTab) {
      case 'current':
  return (
          <div 
            className="glass-card" 
            style={{ 
              animation: 'none',
              transition: 'none',
              transform: 'none',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="current-weather" style={{ 
              animation: 'none',
              transition: 'none',
              transform: 'none'
            }}>
              <div className="weather-info" style={{ 
                animation: 'none',
                transition: 'none',
                transform: 'none'
              }}>
                <h1 className="condition" style={{ 
                  animation: 'none',
                  transition: 'none',
                  transform: 'none',
                  borderBottom: 'none',
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  letterSpacing: '1px',
                  marginBottom: '0.5rem',
                  color: '#ffffff'
                }}>{weatherData.condition}</h1>
                <h2 className="sub-condition" style={{ 
                  animation: 'none',
                  transition: 'none',
                  transform: 'none',
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  letterSpacing: '0.5px',
                  color: '#ffffff'
                }}>{weatherData.description}</h2>
              </div>
              <div className="weather-details" style={{ 
                animation: 'none',
                transition: 'none',
                transform: 'none'
              }}>
                <div className="temperature" style={{ 
                  animation: 'none',
                  transition: 'none',
                  transform: 'none',
                  fontSize: '4.5rem',
                  fontWeight: '800',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  color: '#ffffff'
                }}>
                  <span className="temp-value">{getTemperature(weatherData?.temperature || 0)}</span>
                  <span className="temp-unit" style={{ fontSize: '2.5rem', fontWeight: '700' }}>°{tempUnit}</span>
          </div>
                <div className="location" style={{ 
                  animation: 'none',
                  transition: 'none',
                  transform: 'none',
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  color: '#ffffff'
                }}>
                  <span className="location-name">{weatherData.location}</span>
                  <span className="weather-stats" style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 600,
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                    color: '#ffffff'
                  }}>
                    Humidity: {weatherData.humidity}% | Pressure: {weatherData.pressure}hPa
                  </span>
        </div>
          </div>
        </div>

            <div className="weather-stats">
              <div className="stat-card wind-status" style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem',
                borderRadius: '12px'
              }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 700, 
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>Wind Status</h3>
                <div className="stat-value" style={{ 
                  fontSize: '2.2rem', 
                  fontWeight: 800,
                  color: '#ffffff',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)'
                }}>{weatherData.windSpeed}<span className="unit">km/h</span></div>
              </div>
              <div className="stat-card sun-position" style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem',
                borderRadius: '12px'
              }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 700, 
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>Sunrise & Sunset</h3>
                <div className="sun-arc">
                  <div className="sunrise" style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 700,
                    color: '#ffffff',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)'
                  }}>
                    <Sun size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))' }} />
                    <span>{weatherData.sunrise}</span>
                  </div>
                  <div className="sunset" style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 700,
                    color: '#ffffff',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)'
                  }}>
                    <Moon size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))' }} />
                    <span>{weatherData.sunset}</span>
                  </div>
            </div>
              </div>
              <div className="stat-card aqi-status" style={{
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem',
                borderRadius: '12px'
              }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 700, 
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)',
                  color: '#ffffff',
                  marginBottom: '0.5rem'
                }}>Air Quality</h3>
                <div className={`aqi-value ${weatherData.aqi.category.toLowerCase()}`} style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800,
                  color: '#ffffff',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)'
                }}>
                  <span className="value">{weatherData.aqi.value}</span>
                  <span className="category">{weatherData.aqi.category}</span>
                </div>
                <div className="aqi-details" style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 600,
                  color: '#ffffff',
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9)'
                }}>
                  <div className="pollutant">
                    <span className="label">Main Pollutant:</span>
                    <span className="value">{weatherData.aqi.mainPollutant.toUpperCase()}</span>
                  </div>
                  <div className="components">
                    <div className="component">
                      <span className="label">PM2.5:</span>
                      <span className="value">{weatherData.aqi.components.pm2_5}</span>
                    </div>
                    <div className="component">
                      <span className="label">PM10:</span>
                      <span className="value">{weatherData.aqi.components.pm10}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'forecast':
        return (
          <div 
            className="glass-card forecast-view" 
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 className="section-title" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>Weather Vibes</h2>
            <div className="forecast-content">
              <div className="forecast-cards">
                {weatherData.forecast.map((day, index) => (
                  <div
                    key={index}
                    className="forecast-card"
                  >
                    <div className="forecast-card-header">
                      <span className="day">{day.day}</span>
                      <span className="date">{day.date}</span>
                    </div>
                    <div className="forecast-card-body">
                      <div className="weather-icon">
                        {day.condition === 'clear' && <Sun size={24} />}
                        {day.condition === 'clouds' && <Cloud size={24} />}
                        {day.condition === 'rain' && <CloudRain size={24} />}
                        {day.condition === 'snow' && <CloudSnow size={24} />}
                        {day.condition === 'thunderstorm' && <CloudLightning size={24} />}
                      </div>
                      <div className="temperature-range">
                        <span className="high">{getTemperature(day.high)}°</span>
                        <div className="temp-bar">
                          <div 
                            className="temp-fill" 
                            style={{ 
                              width: `${((getTemperature(day.temp) - getTemperature(day.low)) / (getTemperature(day.high) - getTemperature(day.low))) * 100}%`
                            }}
                          />
                        </div>
                        <span className="low">{getTemperature(day.low)}°</span>
                      </div>
                    </div>
                    <div className="forecast-card-footer">
                      <div className="forecast-detail">
                        <Droplet size={16} />
                        <span>{day.precipitation}%</span>
                      </div>
                      <div className="forecast-detail">
                        <Wind size={16} />
                        <span>{day.wind} km/h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'precipitation':
        return (
          <div 
            className="glass-card" 
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 className="section-title" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>Precipitation Forecast</h2>
            <div className="precipitation-chart">
              {weatherData.precipitationData.map((data, index) => (
                <div key={index} className="precipitation-bar">
                  <div className="bar-label">
                    <span className="time">{data.time}</span>
                    <span className="amount">{data.amount.toFixed(1)}mm</span>
                  </div>
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${Math.min(data.amount * 10, 100)}%`,
                      backgroundColor: data.type === 'rain' ? '#60a5fa' : '#e2e8f0'
                    }}
                  />
                  <span className="probability">{data.probability}%</span>
                </div>
              ))}
            </div>
            <div className="precipitation-stats">
              <div className="stat">
                <h3>Total Precipitation</h3>
                <span>{weatherData.precipitationData.reduce((sum, data) => sum + data.amount, 0).toFixed(1)}mm</span>
              </div>
              <div className="stat">
                <h3>Max Probability</h3>
                <span>{Math.max(...weatherData.precipitationData.map(data => data.probability))}%</span>
              </div>
            </div>
          </div>
        );

      case 'radar':
        return (
          <div 
            className="glass-card radar-view" 
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 className="section-title" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>Weather Radar</h2>
            <div className="radar-content">
              <div className="radar-grid">
                {weatherData.radarData.map((data, index) => (
                  <div
                    key={index}
                    className={`radar-card ${data.type}`}
                  >
                    <div className="radar-card-header">
                      <span className="time">{data.time}</span>
                      <div className={`type-indicator ${data.type}`}>
                        {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
          </div>
        </div>
                    <div className="radar-card-body">
                      <div className="intensity-meter">
                        <div 
                          className="intensity-fill"
                          style={{ width: `${data.intensity * 100}%` }}
                        />
                        <span className="intensity-label">
                          Intensity: {Math.round(data.intensity * 100)}%
                        </span>
                      </div>
                      <div className="coverage-meter">
                        <div 
                          className="coverage-fill"
                          style={{ width: `${data.coverage}%` }}
                        />
                        <span className="coverage-label">
                          Coverage: {data.coverage}%
                        </span>
                      </div>
          </div>
        </div>
                ))}
              </div>
              <div className="radar-legend">
                <div className="legend-item">
                  <div className="legend-color rain" />
                  <span>Rain</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color snow" />
                  <span>Snow</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color mixed" />
                  <span>Mixed</span>
          </div>
        </div>
      </div>
    </div>
  );

      case 'wind':
  return (
          <div 
            className="glass-card wind-dashboard" 
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <h2 className="section-title" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>Wind Analysis</h2>
            <div className="wind-content">
              <div className="wind-main">
                <div className="wind-compass">
                  <div className="compass-ring">
                    <div className="compass-label north">N</div>
                    <div className="compass-label east">E</div>
                    <div className="compass-label south">S</div>
                    <div className="compass-label west">W</div>
                  </div>
                  {weatherData.windData.map((data, index) => (
                    <div
                      key={index}
                      className="wind-arrow"
                      style={{
                        transform: `rotate(${data.direction}deg)`
                      }}
                    >
                      <div className="arrow-head" />
                      <div className="wind-speed">
                        <span>{data.speed}</span>
                        <small>km/h</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="wind-info-panel">
                  <div className="current-wind">
                    <h3>Current Wind</h3>
                    <div className="wind-speed-large">
                      {weatherData.windData[0]?.speed || 0}
                      <span>km/h</span>
                    </div>
                    <div className="wind-direction-text">
                      {getWindDirection(weatherData.windData[0]?.direction || 0)}
                    </div>
                  </div>
                  <div className="wind-stats-grid">
                    <div className="stat-box">
                      <h4>Average Speed</h4>
                      <div className="stat-value">
                        {Math.round(
                          weatherData.windData.reduce((sum, data) => sum + data.speed, 0) /
                          weatherData.windData.length
                        )}
                        <span>km/h</span>
                      </div>
                    </div>
                    <div className="stat-box">
                      <h4>Max Gust</h4>
                      <div className="stat-value">
                        {Math.max(...weatherData.windData.map(data => data.gust))}
                        <span>km/h</span>
                      </div>
                    </div>
                    <div className="stat-box">
                      <h4>Wind Variability</h4>
                      <div className="stat-value">
                        {getWindVariability(weatherData.windData)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wind-timeline">
                {weatherData.windData.map((data, index) => (
                  <div key={index} className="timeline-point">
                    <div className="time">{data.time}</div>
                    <div 
                      className="speed-bar"
                      style={{ height: `${(data.speed / 50) * 100}%` }}
                    />
                    <div className="speed-value">{data.speed} km/h</div>
                  </div>
                ))}
              </div>
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  // Helper function for wind direction
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(((degrees % 360) / 22.5));
    return directions[index % 16];
  };

  // Helper function for wind variability
  const getWindVariability = (windData: Array<{ speed: number; direction: number }>) => {
    const directions = windData.map(data => data.direction);
    const maxDiff = Math.max(...directions) - Math.min(...directions);
    if (maxDiff > 45) return 'High';
    if (maxDiff > 20) return 'Moderate';
    return 'Low';
  };

  // Add helper functions for AQI
  const getAQICategory = (aqi: number) => {
    switch (aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'Unknown';
    }
  };

  const getMainPollutant = (components: any) => {
    const pollutants = {
      pm2_5: components.pm2_5,
      pm10: components.pm10,
      no2: components.no2,
      o3: components.o3,
      so2: components.so2,
      co: components.co
    };
    return Object.entries(pollutants).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div 
      className="weather-app" 
      data-weather={weatherData?.condition?.toLowerCase() || 'clear'}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        transition: 'none',
        color: '#ffffff',
        textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
        fontWeight: 600,
        letterSpacing: '0.5px',
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
        backgroundBlendMode: 'overlay'
      }}
    >
      {weatherData?.condition?.toLowerCase() === 'rain' && (
        <div className="rain-container">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="rain-drop" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.3}s`
            }} />
          ))}
        </div>
      )}
      <div className="weather-effects">
        {weatherData?.condition?.toLowerCase() === 'rain' && <div className="rain-effect" />}
        {weatherData?.condition?.toLowerCase() === 'snow' && <div className="snow-effect" />}
        {weatherData?.condition?.toLowerCase() === 'thunderstorm' && <div className="thunder-effect" />}
        {weatherData?.condition?.toLowerCase() === 'clear' && <div className="sun-effect" />}
        {weatherData?.condition?.toLowerCase() === 'clouds' && <div className="cloud-effect" />}
      </div>
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sun-logo" style={{ 
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          fontWeight: 600
        }}>
          <Sun className="sun-icon" style={{
            animation: 'float 3s ease-in-out infinite'
          }} />
        </div>
        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: '0.5px'
              }}
            >
              {tab.icon}
              <span className="tab-label">{tab.label}</span>
            </motion.button>
          ))}
        </nav>
      </aside>

      <div className="app-container">
        {/* Header */}
        <header className="app-header" style={{ 
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          fontWeight: 600,
          fontSize: '1.2rem'
        }}>
          <button 
            className="hamburger-menu" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className="logo" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            <Cloud className="logo-icon" style={{
              animation: 'float 3s ease-in-out infinite'
            }} />
            <span>WeatherTickler</span>
          </div>

          <div className="header-controls">
            <div className="temp-unit-switch" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginRight: '1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: '0.3rem'
            }}>
              <button
                onClick={() => setTempUnit('C')}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: tempUnit === 'C' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                  color: tempUnit === 'C' ? '#1a1a1a' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                °C
              </button>
              <button
                onClick={() => setTempUnit('F')}
                style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: tempUnit === 'F' ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                  color: tempUnit === 'F' ? '#1a1a1a' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                °F
              </button>
            </div>
            <form 
              className="search-container"
              onSubmit={(e) => {
                e.preventDefault();
                const searchInput = e.currentTarget.querySelector('input');
                if (searchInput) {
                  setSearchQuery(searchInput.value);
                }
              }}
            >
              <input
                type="text"
                placeholder="Search location..."
                className="search-input"
                defaultValue={searchQuery}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(e.currentTarget.value);
                  }
                }}
              />
              <button type="submit" className="search-button">
                <Search className="search-icon" />
              </button>
            </form>
            <div className="user-profile">
              <img src="https://i.pravatar.cc/32" alt="User" className="avatar" />
              <div className="user-info">
                <span className="user-name">Admin</span>
                <span className="user-time">{new Date().toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <nav className="nav-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
              >
                {tab.icon}
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <main className="weather-content">
          <div style={{ width: '100%' }}>
            {renderContent()}
        </div>
        </main>
      </div>
    </div>
  );
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .weather-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    color: white;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8));
  }

  .logo-icon {
    animation: float 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default App;