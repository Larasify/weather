import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col py-4">
      <div className="w-30 bg-pink-400 rounded border-2 border-dashed border-gray-200 p-8 text-center">
        Hello
      </div>
      <div className="p-2"></div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full lg:w-96 lg:flex-col flex-row justify-between">
          <div className="h-1/2 bg-blue-400 w-full rounded border-2 border-dashed border-gray-200 p-8 text-center">
            Hello
          </div>
          <div className="p-2"></div>
          <div className="h-1/2 bg-green-400 w-full rounded border-2 border-dashed border-gray-200 p-8 text-center">
            Hello
          </div>
        </div>
        <div className="p-2"></div>
        <div className=" h-96 bg-red-400 w-full border p-8">Hiya</div>
      </div>
    </div>
  );
};

export default Home;
