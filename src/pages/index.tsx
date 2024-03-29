import { type NextPage } from "next";
import { BottomCard, TopCard } from "~/components/Cards";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMapContext } from "~/components/MapReducer";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";

export type setNewCoordType = (lat: string, lon: string) => void;

const Home: NextPage = () => {
  const MapWithNoSSR = dynamic(() => import("~/components/Map"), {
    ssr: false,
  });

  //We prefetch here for a better loading state on first load so we dont get loading spinner on components
  const { data, isLoading, refetch } = api.service.weatherapi.useQuery(
    {
      lat: "53.381549",
      lon: "-1.4819047",
    },
    {
      refetchInterval: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  if(isLoading) return <div><LoadingPage /></div>;

  return (
    <>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 py-4">
        <div className="w-30 rounded border-2 border-dashed border-gray-200  p-4">
          <InfoCard />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row lg:w-2/5 lg:flex-col">
            <div className="w-full rounded border-2 border-dashed border-gray-200  p-4">
              <TopCard />
            </div>

            <div className="w-full rounded border-2 border-dashed border-gray-200 p-4">
              <BottomCard />
            </div>
          </div>
          <div className="w-full rounded border-2 border-dashed border-gray-200 p-4">
            <div
              id="map"
              className="h-screen max-h-96 w-full lg:h-full lg:max-h-full lg:w-full"
            >
              <MapWithNoSSR />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InfoCard = () => {
  const { coords, dispatch } = useMapContext();
  return (
    <div className="w-full overflow-hidden rounded bg-white shadow-lg">
      <div className="flex flex-row items-center justify-between px-6">
        <div className="flex flex-row items-center ">
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
            <p className="text-base text-gray-900">{coords.locationName}</p>
          </div>
        </div>
        <button
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          className="mb-2 hidden rounded bg-black px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white opacity-75 shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg sm:inline-block"
          onClick={() => {
            window.location.href = "https://github.com/Larasify";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
