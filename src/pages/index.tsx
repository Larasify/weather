import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col py-4">
      <div className="w-30 rounded border-2 border-dashed border-gray-200  p-4">
        <InfoCard/>
      </div>
      <div className="p-2"></div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full flex-row justify-between lg:w-96 lg:flex-col">
          <div className="h-1/2 w-full rounded border-2 border-dashed border-gray-200  p-8 text-center">
            Hello
          </div>
          <div className="p-2"></div>
          <div className="h-1/2 w-full rounded border-2 border-dashed border-gray-200  p-8 text-center">
            Hello
          </div>
        </div>
        <div className="p-2"></div>
        <div className=" h-96 w-full rounded border-2 border-dashed border-gray-200  p-8">
          Hiya
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        </p>
      </div>
    </div>
  );
};

export default Home;
