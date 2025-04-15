# WeatherUI - Modern Weather Application

A beautiful and responsive weather application built with React and TypeScript, featuring real-time weather data, forecasts, and interactive UI elements.

## Features

- 🌤️ Real-time weather data for any location
- 📱 Responsive design for both desktop and mobile
- 🌙 Dynamic background based on weather conditions and time of day
- 📊 Detailed weather information including:
  - Current temperature and conditions
  - Air quality index (AQI)
  - Wind speed and direction
  - Humidity and pressure
  - Sunrise and sunset times
- 🔍 Location search functionality
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- 📈 Weather forecast for upcoming days
- 🎨 Beautiful UI with glassmorphism design
- 🌧️ Weather effects (rain, snow, etc.)

## Technologies Used

- React
- TypeScript
- CSS3 (with modern features like backdrop-filter)
- OpenWeatherMap API
- Lucide React (for icons)
- Framer Motion (for animations)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kaustubh2026/WeatherUI.git
cd WeatherUI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── App.tsx              # Main application component
├── index.css           # Global styles
├── index.tsx           # Application entry point
└── types/              # TypeScript type definitions
```

## API Integration

The application uses the OpenWeatherMap API to fetch weather data. The following endpoints are used:

- Current weather data
- 5-day forecast
- Air quality data
- Geocoding for location search

## Styling

The application uses modern CSS features including:
- CSS Grid and Flexbox for layouts
- CSS Variables for theming
- Backdrop-filter for glassmorphism effects
- CSS Animations for weather effects
- Responsive design with media queries

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeatherMap for providing the weather data API
- Lucide React for the beautiful icons
- Framer Motion for the smooth animations

## Contact

Kaustubh - [@Kaustubh2026](https://github.com/Kaustubh2026)

Project Link: [https://github.com/Kaustubh2026/WeatherUI](https://github.com/Kaustubh2026/WeatherUI) 