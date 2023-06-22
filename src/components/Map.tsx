import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useRef, useState } from "react";
import { type setNewCoordType } from "~/pages";
import { useMapContext } from "./MapReducer";
import { LatLng } from "leaflet";

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [{ lat, lon }, setCoords] = useState({
    lat: 53.381549,
    lon: -1.4819047,
  });
  const { coords, dispatch } = useMapContext();

  function AddMarkerOnClick() {
    const map = useMapEvents({
      click(e) {
        const newCoords = e.latlng;
        map.setView(newCoords, map.getZoom());
        setCoords({ lat: newCoords.lat, lon: newCoords.lng });
        dispatch({ type: "setLat", payload: newCoords.lat.toString() });
        dispatch({ type: "setLon", payload: newCoords.lng.toString() });
      },
    });
    return null;
  }

  function ChangeView({ center }: { center: { lat: number; lng: number } }) {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  }

  useEffect(() => {
    setCoords({ lat: coords.lat, lon: coords.lon });
  }, [coords]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false}
    >
      <AddMarkerOnClick />
      <ChangeView
        center={{
          lat: coords.lat,
          lng: coords.lon,
        }}
      />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]} draggable={false}>
        <Popup>Hey ! you found me</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
