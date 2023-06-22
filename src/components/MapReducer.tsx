import * as React from "react";
import { useEffect, useReducer } from "react";
import { api } from "~/utils/api";
export type MapState = {
  lat: number;
  lon: number;
  locationName: string;

};
export type Action =
  | { type: "setLat"; payload: string }
  | { type: "setLon"; payload: string }
  | { type: "setLocationName"; payload: string };


export type ProviderState = {
  coords: MapState;
  dispatch: React.Dispatch<Action>;
};

const mapContext = React.createContext({} as ProviderState);

const reducer = (state: MapState, action: Action) => {
  switch (action.type) {
    case "setLat":
      return { ...state, lat: parseFloat(action.payload) };
    case "setLon":
      return { ...state, lon: parseFloat(action.payload) };
    case "setLocationName":
      return { ...state, locationName: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

export default function MapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [coords, dispatch] = useReducer(reducer, {
    lat: 53.381549,
    lon: -1.4819047,
    locationName: "Sheffield",
  });

  const {
    data: locationData,
    isLoading: locationIsLoading,
    refetch: locationRefetch,
  } = api.service.locationapi.useQuery(
    { lat: coords.lat.toString(), lon: coords.lon.toString() },
    {
      refetchInterval: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() =>{
    void locationRefetch();
  },[coords.lat, coords.lon]);
  
  useEffect(() => {
    if(!locationIsLoading)
      dispatch({ type: "setLocationName", payload: locationData || "Sheffield" });
  },[locationData])


  return (
    <mapContext.Provider value={{ coords, dispatch }}>
      {children}
    </mapContext.Provider>
  );
}

export const useMapContext = () => React.useContext(mapContext);
