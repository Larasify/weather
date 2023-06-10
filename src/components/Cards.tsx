import type { WeatherResponse } from "../server/api/routers/service";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { weatherCondition } from "~/utils/weatherCondition";
import Image from "next/image";
import { type setNewCoordType } from "~/pages";
import { useState } from "react";

const titlestyle = "text-sm text-gray-700";
const valuestyle = "text-sm text-gray-400";
export const BottomCard = (props: WeatherResponse) => {
  const condition = weatherCondition(props.daily.weathercode);
  if (!condition) return <div>:c</div>;
  return (
    <div className="overflow-hidden rounded-lg shadow-lg ">
      <div className="flex flex-row justify-between border p-4">
        <span className="text-sm font-bold uppercase tracking-widest">
          Weather
        </span>
        <span className="capitilze rounded bg-black px-2 text-sm tracking-widest text-white opacity-75 shadow-lg">
          {dayjs().format("MMMM D")}
        </span>
      </div>

      <div className="flex flex-col items-center justify-between gap-5 border p-4">
        <div className="flex w-full flex-row items-center justify-between align-middle">
          <Image
            src={condition.iconurl}
            width={64}
            height={64}
            alt="Weather"
            className="h-full"
          />
          <div className="flex flex-col items-center">
            <Icon icon="wi:night-sprinkle" className="text-3xl text-blue-400" />
            <b className={titlestyle}>Precipitation</b>
            <span className={valuestyle}>
              {props.daily.precipitation_probability_max}%
            </span>
          </div>
        </div>
        <div className="w-full text-sm">
          <b>{condition.condition}</b>
          <span> throughout the day</span>
        </div>
      </div>

      <div className="flex flex-row justify-between border p-4 px-8">
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

      <div className="flex flex-row justify-between border p-4 px-8">
        <div className="flex items-center">
          <Icon icon="wi:horizon-alt" className="text-3xl text-yellow-500" />
          <div className="flex flex-col">
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

export const TopCard: React.FC<{
  coords: string[];
  setNewCoords: setNewCoordType;
}> = (props) => {
  const [latinput, setLatInput] = useState(props.coords[0]);
  const [loninput, setLonInput] = useState(props.coords[1]);

  //if(!props.coords[0] || !props.coords[1]) return(<div></div>);
  //const lat = props.coords[0];
  //const lon = props.coords[1];
  //setLatInput(props.coords[0]);
  //setLonInput(props.coords[1]);

  const handleClick = () => {
    console.log("clicked");
    if (!latinput || !loninput) return;
    props.setNewCoords(latinput, loninput);
  };

  return (
    <div className="flex flex-col justify-center shadow-xl rounded-lg w-full h-full my-auto">
      <div className="flex flex-row justify-between p-4">
        <span className="text-sm font-bold uppercase tracking-widest">
          Coordinates
        </span>
        <span className="capitilze rounded bg-black px-2 text-sm tracking-widest text-white opacity-75 shadow-lg">
          Turkey
        </span>
      </div>

      <div className="flex flex-row items-center justify-between py-4 px-8 border p-4">
        <span className="block text-sm font-medium text-gray900">Lattitude</span>
        <input
          type="text"
          className="block w-32 rounded-lg border border-gray-300 bg-gray-100 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
          placeholder="lattitude"
          value={latinput}
          onChange={(e) => setLatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
      </div>

      <div className="flex flex-row items-center justify-between py-4 px-8 p-4">
        <span className="block text-sm font-medium text-gray900">Longitude</span>
        <input
          type="text"
          className="block w-32 rounded-lg bg-gray-100 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
          placeholder="longitude"
          value={loninput}
          onChange={(e) => setLonInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
      </div>
    </div>
  );
};
