import * as React from "react";
import { useReducer } from "react";
export type MapState = {
  lat: number;
  lon: number;
};
export type Action =
  | { type: "setLat"; payload: string }
  | { type: "setLon"; payload: string };

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
  });

  return (
    <mapContext.Provider value={{ coords, dispatch }}>
      {children}
    </mapContext.Provider>
  );
}

export const useMapContext = () => React.useContext(mapContext);
