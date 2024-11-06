import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public date: string,
    public icon: string,
    public iconDescription: string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number
  ) {}
}

// Complete the WeatherService class
class WeatherService {
  private baseURL = process.env.API_BASE_URL;
  private apiKey = process.env.API_KEY;

  // Fetch location data based on city name
  private async fetchLocationData(query: string) {
    const response = await axios.get(
      `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`
    );
    return response.data[0];
  }

  // Destructure location data to get coordinates
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // Build the weather query URL
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  // Fetch weather data based on coordinates
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await axios.get(this.buildWeatherQuery(coordinates));
    return response.data;
  }

  // Parse current weather data
  private parseCurrentWeather(response: any) {
    const currentWeather = response.list[0];
    return new Weather(
      response.city.name,
      new Date(currentWeather.dt * 1000).toLocaleDateString(),
      currentWeather.weather[0].icon,
      currentWeather.weather[0].description,
      currentWeather.main.temp,
      currentWeather.wind.speed,
      currentWeather.main.humidity
    );
  }

  // Build the forecast array
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    const dailyData: { [key: string]: any[] } = {};

    // Group data by date
    weatherData.forEach((data: any) => {
      const date = new Date(data.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(data);
    });

    // Create Weather objects for each day
    Object.keys(dailyData).forEach((date, index) => {
      if (index < 5) { // Ensure we only take 5 days
        const dayData = dailyData[date];
        const avgTemp = (dayData.reduce((sum, data) => sum + data.main.temp, 0) / dayData.length).toFixed(1);
        const avgWindSpeed = (dayData.reduce((sum, data) => sum + data.wind.speed, 0) / dayData.length).toFixed(2);
        const avgHumidity = dayData.reduce((sum, data) => sum + data.main.humidity, 0) / dayData.length;
        const icon = dayData[0].weather[0].icon;
        const iconDescription = dayData[0].weather[0].description;

        forecastArray.push(new Weather(
          currentWeather.city,
          date,
          icon,
          iconDescription,
          parseFloat(avgTemp),
          parseFloat(avgWindSpeed),
          avgHumidity
        ));
      }
    });

    return [currentWeather, ...forecastArray];
  }

  // Get weather for a city
  async getWeatherForCity(city: string) {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, weatherData.list);
  }
}

export default new WeatherService();
