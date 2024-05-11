import { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { MainContext } from "@/pages/Layout";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export const UserLocalTime = ({ isActive = true }) => {
  const [userTime, setUserTime] = useState(DateTime.now().toFormat("HH:mm:ss"));
  const { authUser, databaseUser } = useContext(MainContext);
  const globalUserTime = useTypedSelector(
    (state) => state.cityWeather.cityTime
  );
  const { setCityTime } = useActions();

  useEffect(() => {
    const time = setInterval(() => {
      if (authUser && databaseUser) {
        const now = DateTime.now().setZone(databaseUser?.timeZone);
        setUserTime(now.toFormat("HH:mm:ss"));
        !globalUserTime && setCityTime(now.toFormat("HH:mm:ss"));
      } else {
        const now = DateTime.now().setZone("Europe/Istanbul");
        setUserTime(now.toFormat("HH:mm:ss"));
        !globalUserTime && setCityTime(now.toFormat("HH:mm:ss"));
      }
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, [userTime]);

  return (
    <span
      id="user-location-time"
      style={{ display: isActive ? "block" : "none" }}
    >
      {userTime}
    </span>
  );
};
