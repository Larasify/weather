import type { WeatherResponse } from "../server/api/routers/service";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";


const titlestyle = "text-sm text-gray-700";
const valuestyle = "text-sm text-gray-400";
export const BottomCard = (props: WeatherResponse) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="flex flex-row justify-between border p-4"> 
      <span className="uppercase tracking-widest text-sm font-bold">Weather</span>
      <span className="capitilze tracking-widest text-sm text-white bg-black px-2 rounded opacity-75 shadow-lg">{dayjs().format("MMMM D")}</span>
      </div>

      <div className="flex border p-4"> hey</div>

      <div className="flex flex-row justify-between border p-4">
        <div className="flex items-center">
          <Icon
            icon="wi:thermometer-exterior"
            className="text-3xl text-blue-500"
          />
          <div className="flex flex-col">
            <b className={titlestyle}>Minimum</b>{" "}
            <span className={valuestyle}>{props.daily.temperature_2m_min}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Icon icon="wi:thermometer" className="text-3xl text-red-500" />
          <div className="flex flex-col">
            <b className={titlestyle}>Maximum</b>{" "}
            <span className={valuestyle}>{props.daily.temperature_2m_max}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between border p-4">
        <div className="flex items-center">
          <Icon icon="wi:horizon-alt" className="text-3xl text-yellow-500" />
          <div className="flex flex-col ">
            <b className={titlestyle}>Sunrise</b>{" "}
            <span className={valuestyle}>
              {dayjs(props.daily.sunrise).format("HH:MM")}
            </span>
          </div>
        </div>
        <div className="flex items-center pr-6">
          <Icon icon="wi:horizon" className="text-3xl text-purple-800" />
          <div className="flex flex-col">
            <b className={titlestyle}>Sunset</b>{" "}
            <span className={valuestyle}>
              {dayjs(props.daily.sunset).format("HH:MM")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};