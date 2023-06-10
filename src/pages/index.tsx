import { type NextPage } from "next";
import { api } from "~/utils/api";
import { BottomCard, TopCard } from "~/components/Cards";
import { useState } from "react";
import dynamic from "next/dynamic";

export type setNewCoordType = (lat: string, lon: string) => void;

const Home: NextPage = () => {
  const [input, setInput] = useState(["52", "13"]);
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

 

  const setNewCoords: setNewCoordType = (lat: string, lon: string) => {
    console.log(lat);
    setInput([lat, lon]);
    //void refetch();
  };

  const MapWithNoSSR = dynamic(() => import("~/components/Map"), {
    ssr: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data || !data.limitedResponse) return <div>Hello</div>;
  return (
    <>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 py-2">
        <div className="w-30 rounded border-2 border-dashed border-gray-200  p-4">
          {isLoading
            ? "Loading..."
            : data?.limitedResponse?.daily.temperature_2m_min}
          {isLoading
            ? "Loading..."
            : data?.limitedResponse?.current_weather.temperature}
          <InfoCard />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row lg:w-2/5 lg:flex-col">
            <div className="w-full rounded border-2 border-dashed border-gray-200  p-4">
              <TopCard coords={input} setNewCoords={setNewCoords} />
            </div>

            <div className="w-full rounded border-2 border-dashed border-gray-200 p-4">
              <BottomCard {...data.limitedResponse} />
            </div>
          </div>
          <div className="w-full rounded border-2 border-dashed border-gray-200 p-4">
            <div id="map" className="w-full max-h-96 h-screen lg:max-h-full lg:w-full lg:h-full" >
              <MapWithNoSSR coords={input} setNewCoords={setNewCoords}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoCard = () => {
  return (
    <div className="w-full overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
        <p className="text-base text-gray-700">pleading face</p>
      </div>
    </div>
  );
};

export default Home;
