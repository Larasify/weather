import { type NextPage } from "next";
import { api } from "~/utils/api";


const Home: NextPage = () => {
  const {data, isLoading} = api.example.hello.useQuery({text: 'client'})
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col py-2">
      <div className="w-30 rounded border-2 border-dashed border-gray-200  p-4">
        <InfoCard />
      </div>
      <div className="p-2"></div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full flex-col justify-between sm:flex-row lg:w-96 lg:flex-col">
          <div className="h-1/2 w-full rounded border-2 border-dashed border-gray-200  p-6 text-center">
            <InfoCard />
          </div>
          <div className="p-2"></div>
          <div className="h-1/2 w-full rounded border-2 border-dashed border-gray-200  p-6 text-center">
            <InfoCard />
          </div>
        </div>
        <div className="p-2"></div>
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibusasl  lsjdlkasdlaksjdlkajldssjalskdjls jdlkasdlaksjdlkajldssjalskdjls jdlkasdlaksjdlkajldssjalskdjls jdlkasdlaksjdlkajldssjalskdjls
        </p>
      </div>
    </div>
  );
};

export default Home;
