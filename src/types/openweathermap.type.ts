type TWeather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export interface IOpenWeatherMap {
  base: string;
  clouds: {};
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: { [name: string]: number };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: TWeather[];
  wind: { [name: string]: number };
}
