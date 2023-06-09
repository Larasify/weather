import { type NextPage } from "next";
import { api } from "~/utils/api";
import type { WeatherResponse } from "../server/api/routers/service";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { BottomCard } from "~/components/Cards";

const Home: NextPage = () => {
  const { data, isLoading } = api.service.weatherapi.useQuery(undefined, {
    refetchInterval: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  if (!data || !data.limitedResponse) return null;
  return (
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
        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row lg:w-96 lg:flex-col">
          <div className="w-full rounded border-2 border-dashed border-gray-200  p-6 text-center">
            <InfoCard />
          </div>

          <div className="w-full rounded border-2 border-dashed border-gray-200 p-6">
            <BottomCard {...data.limitedResponse} />
          </div>
        </div>
        <div className="w-full rounded border-2 border-dashed border-gray-200  p-6">
          <InfoCard />
        </div>
      </div>
    </div>
  );
};

const InfoCard = () => {
  return (
    <div className="w-full overflow-hidden rounded shadow-lg">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">The Coldest Sunset</div>
        <p className="text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Voluptatibusasl lsjdlkasdlaksjdlkajldssjalskdjls
        </p>
      </div>
    </div>
  );
};


export default Home;
