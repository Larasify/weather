import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import MapProvider from "~/components/MapReducer";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  const description =
    "Local weather checker";
  const title = "weather | larasify";
  const imageMetaURL = "https://weather-larasify.vercel.app/social.png";

  return (
    <MapProvider>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={"https://weather-larasify.vercel.app/favicon.ico"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageMetaURL} />
        <meta name="twitter:image" content={imageMetaURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="typepilled" />
        <meta name="application-name" content="typepilled" />
      </Head>
      <Component {...pageProps} />{" "}
    </MapProvider>
  );
};

export default api.withTRPC(MyApp);
