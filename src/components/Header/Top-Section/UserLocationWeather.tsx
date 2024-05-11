import { useContext, useEffect, useState } from "react";
import { getUserLocationWeather } from "@/utils/getCityTime";
import { Flex, Text } from "@chakra-ui/react";
import {
  WiDaySunny,
  WiMoonWaxingCrescent3,
  WiNightAltCloudy,
  WiNightAltStormShowers,
  WiNightRain,
  WiSnow,
  WiThermometer,
  WiNightFog,
} from "react-icons/wi";
import { MainContext } from "@/pages/Layout";
import { IOpenWeatherMap } from "@/types/openweathermap.type";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export const UserLocationWeather = () => {
  const { databaseUser, authUser } = useContext(MainContext);
  const cityWeather = useTypedSelector(
    (state) => state.cityWeather.cityWeather
  );
  const userTime = useTypedSelector((state) => state.cityWeather.cityTime);
  const [weatherStatus, setWeatherStatus] = useState();
  const currentUserCity = databaseUser?.locationCity
    ? databaseUser?.locationCity
    : "Istanbul";
  const { setCityWeather } = useActions();

  useEffect(() => {
    if (!cityWeather && currentUserCity) {
      (async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentUserCity}&units=metric&appid=${
          import.meta.env.VITE_API_OPEN_WEATHER_KEY
        }`;
        const response: IOpenWeatherMap = await getUserLocationWeather(url);
        setCityWeather(response);
      })();
    }
    if (cityWeather && userTime) {
      const weatherDesc = cityWeather?.weather?.[0].description;

      switch (weatherDesc) {
        case "clear sky":
          if (
            userTime &&
            userTime?.slice(0, 2) >= "08" &&
            userTime?.slice(0, 2) <= "19"
          ) {
            setWeatherStatus(<WiDaySunny />);
          } else {
            setWeatherStatus(<WiMoonWaxingCrescent3 size="25px" />);
          }
          break;
        case "few clouds":
        case "scattered clouds":
        case "broken clouds":
        case "overcast clouds":
          setWeatherStatus(<WiNightAltCloudy size="22px" />);
          break;

        case "rain":
        case "light rain":
        case "heavy rain":
          setWeatherStatus(<WiNightRain size="22px" />);
          break;

        case "thunderstorm":
        case "ragged thunderstorm":
        case "heavy thunderstorm":
          setWeatherStatus(<WiNightAltStormShowers size="22px" />);
          break;

        case "drizzle":
        case "light intensity drizzle":
        case "drizzle rain":
          setWeatherStatus(<WiNightAltStormShowers size="22px" />);
          break;

        case "snow":
        case "heavy snow":
        case "light snow":
          setWeatherStatus(<WiSnow size="22px" />);
          break;

        case "haze":
          setWeatherStatus(<WiNightFog size="22px" />);
          break;

        default:
          setWeatherStatus(<WiThermometer size="22px" />);
          break;
      }
    }
  }, [authUser, userTime]);

  return (
    <Flex alignItems="center">
      {currentUserCity}:
      {cityWeather && currentUserCity?.includes(cityWeather?.name) ? (
        <Text ml="4px" display="flex" alignItems="center" gap="2px">
          {weatherStatus}
          {Math.round(cityWeather?.main?.temp)}°
        </Text>
      ) : (
        "no data"
      )}
    </Flex>
  );
};
