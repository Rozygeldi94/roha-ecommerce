import { IOpenWeatherMap } from "@/types/openweathermap.type";
import { createSlice } from "@reduxjs/toolkit";

interface IWeahterInitialState {
  cityWeather: IOpenWeatherMap | null;
  cityTime: any;
}
const initialState: IWeahterInitialState = {
  cityWeather: null,
  cityTime: null,
};

const cityWeather_slice = createSlice({
  name: "cityWeatherSlice",
  initialState,
  reducers: {
    setCityWeather: (state, { payload }: { payload: IOpenWeatherMap }) => {
      state.cityWeather = payload;
    },
    setCityTime: (state, { payload }) => {
      if (!state.cityTime) state.cityTime = payload;
    },
  },
});
export const { actions, reducer } = cityWeather_slice;
