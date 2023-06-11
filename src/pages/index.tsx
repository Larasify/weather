import { type NextPage } from "next";
import { api } from "~/utils/api";
import { BottomCard, TopCard } from "~/components/Cards";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  type LocationResponse,
  type WeatherResponse,
} from "~/server/api/routers/service";
import { LoadingPage } from "~/components/loading";

export type setNewCoordType = (lat: string, lon: string) => void;

const Home: NextPage = () => {
  const [input, setInput] = useState(["53.381549", "-1.4819047"]);
  const [currentData, setCurrentData] = useState<WeatherResponse>();
  const [currentLocationData, setCurrentLocationData] = useState<string>(" ");

  const lat = input[0];
  const lon = input[1];
  if (!lat || !lon) return <div>hello</div>;
  const { data, isLoading, refetch } = api.service.weatherapi.useQuery(
    { lat: lat, lon: lon },
    {
      refetchInterval: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: locationData,
    isLoading: locationIsLoading,
    refetch: locationRefetch,
  } = api.service.locationapi.useQuery(
    { lat: lat, lon: lon },
    {
      refetchInterval: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const setNewCoords: setNewCoordType = (lat: string, lon: string) => {
    console.log(lat);
    setCurrentData(data?.limitedResponse);
    if (locationData) {
      setCurrentLocationData(locationData);
    }
    setInput([lat, lon]);
    //void refetch();
  };

  const MapWithNoSSR = dynamic(() => import("~/components/Map"), {
    ssr: false,
  });

  //if (isLoading) return <LoadingPage/>
  if (data && data.limitedResponse && locationData) {
    if (data.limitedResponse !== currentData) {
      setCurrentData(data.limitedResponse);
    }
    if (locationData !== currentLocationData) {
      setCurrentLocationData(locationData);
    }
  }

  if (!currentData) return <LoadingPage />;
  return (
    <>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 py-2">
        <div className="w-30 rounded border-2 border-dashed border-gray-200  p-4">
          <InfoCard display_name={currentLocationData} />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row lg:w-2/5 lg:flex-col">
            <div className="w-full rounded border-2 border-dashed border-gray-200  p-4">
              <TopCard coords={input} setNewCoords={setNewCoords} currentLocation={currentLocationData} />
            </div>

            <div className="w-full rounded border-2 border-dashed border-gray-200 p-4">
              <BottomCard {...currentData} />
            </div>
          </div>
          <div className="w-full rounded border-2 border-dashed border-gray-200 p-4">
            <div
              id="map"
              className="h-screen max-h-96 w-full lg:h-full lg:max-h-full lg:w-full"
            >
              <MapWithNoSSR coords={input} setNewCoords={setNewCoords} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoCard = (props: LocationResponse) => {
  return (
    <div className="w-full overflow-hidden rounded shadow-lg">
      <div className="flex flex-row items-center px-6">
        <Image
          src="/location.png"
          alt="location"
          width={56}
          height={56}
          className="h-full"
        />
        <div className="px-6 py-4">
          <div className="whitespace-nowrap text-2xl font-semibold">
            Current Location
          </div>
          <p className="text-base text-gray-900">{props.display_name}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
