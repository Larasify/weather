import type { WeatherResponse } from "../server/api/routers/service";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { weatherCondition } from "~/utils/weatherCondition";
import Image from "next/image";
import { type setNewCoordType } from "~/pages";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useMapContext } from "./MapReducer";
import { LoadingPage } from "./loading";

const titlestyle = "text-sm text-gray-700";
const valuestyle = "text-sm text-gray-400";
export const BottomCard = () => {
  const [currentData, setCurrentData] = useState<WeatherResponse>();
  const mapContext = useMapContext();

  const { data, isLoading, refetch } = api.service.weatherapi.useQuery(
    { lat: mapContext.coords.lat.toString(), lon: mapContext.coords.lat.toString(), },
    {
      refetchInterval: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    void refetch();
  }, [mapContext.coords.lat, mapContext.coords.lon]);

  if (data && data.limitedResponse) {
    if (data.limitedResponse !== currentData) {
      setCurrentData(data.limitedResponse);
    }
  }
 
  if (!currentData) return <div>hey</div>;


  const condition = weatherCondition(currentData.daily.weathercode);
  if (!condition) return <div>:c</div>;
  return (
    <div className="overflow-hidden rounded-lg shadow-lg bg-white">
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
              {currentData.daily.precipitation_probability_max}%
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
            <span className={valuestyle}>
              {currentData.daily.temperature_2m_min}º
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Icon icon="wi:thermometer" className="text-3xl text-red-500" />
          <div className="flex flex-col">
            <b className={titlestyle}>Maximum</b>{" "}
            <span className={valuestyle}>
              {currentData.daily.temperature_2m_max}º
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between border p-4 px-8">
        <div className="flex items-center">
          <Icon icon="wi:horizon-alt" className="text-3xl text-yellow-500" />
          <div className="flex flex-col">
            <b className={titlestyle}>Sunrise</b>{" "}
            <span className={valuestyle}>
              {dayjs(currentData.daily.sunrise).format("HH:MM")}
            </span>
          </div>
        </div>
        <div className="flex items-center pr-6">
          <Icon icon="wi:horizon" className="text-3xl text-purple-800" />
          <div className="flex flex-col">
            <b className={titlestyle}>Sunset</b>{" "}
            <span className={valuestyle}>
              {dayjs(currentData.daily.sunset).format("HH:MM")}
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
  currentLocation: string;
  textBoxChange: boolean;
  setTextBoxChange: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const [latinput, setLatInput] = useState(props.coords[0]);
  const [loninput, setLonInput] = useState(props.coords[1]);

  if (!props.coords[0] || !props.coords[1]) return <div></div>;
  if (
    (props.coords[0] !== latinput || props.coords[1] !== loninput) &&
    !props.textBoxChange
  ) {
    setLatInput(props.coords[0]);
    setLonInput(props.coords[1]);
  }

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
    <div className="my-auto flex h-full w-full flex-col justify-center rounded-lg shadow-xl bg-white">
      <div className="flex flex-row justify-between p-4">
        <span className="text-sm font-bold uppercase tracking-widest">
          Coordinates
        </span>
        <span className="rounded bg-black px-2 text-sm uppercase tracking-widest text-white opacity-75 shadow-lg">
          {
            props.currentLocation.split(",")[
              props.currentLocation.split(",").length - 1
            ]
          }
        </span>
      </div>

      <div className="flex flex-row items-center justify-between border-y p-4 px-8 py-4">
        <span className="text-gray900 block text-sm font-medium">
          Lattitude
        </span>
        <input
          type="text"
          className="block w-32 rounded-lg border border-gray-300 bg-gray-100 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
          placeholder="lattitude"
          value={latinput}
          onChange={(e) => {
            setLatInput(e.target.value);
            props.setTextBoxChange(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
      </div>

      <div className="flex flex-row items-center justify-between p-4 px-8 py-4">
        <span className="text-gray900 block text-sm font-medium">
          Longitude
        </span>
        <input
          type="text"
          className="block w-32 rounded-lg border border-gray-300 bg-gray-100 py-2 text-center text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-xs"
          placeholder="longitude"
          value={loninput}
          onChange={(e) => {
            setLonInput(e.target.value);
            props.setTextBoxChange(true);
          }}
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
