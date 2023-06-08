import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col py-4">
      <div className="w-30 bg-pink-400 rounded border-2 border-dashed border-gray-200 p-8 text-center">
        Hello
      </div>
      <div className="p-2"></div>
      <div className="flex flex-row">
        <div className="flex w-1/3 flex-col justify-between rounded border-2 border-dashed border-gray-200">
          <div className="h-1/2 bg-blue-400 rounded border-2 border-dashed border-gray-200 p-8 text-center">
            Hello
          </div>
          <div className="p-2"></div>
          <div className="h-1/2 bg-green-400 rounded border-2 border-dashed border-gray-200 p-8 text-center">
            Hello
          </div>
        </div>
        <div className="p-2"></div>
        <div className=" h-96 bg-red-400 w-2/3 border p-8">Hiya</div>
      </div>
    </div>
  );
};

export default Home;
