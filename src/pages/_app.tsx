import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import MapProvider from "~/components/MapReducer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MapProvider>
      <Component {...pageProps} />{" "}
    </MapProvider>
  );
};

export default api.withTRPC(MyApp);
