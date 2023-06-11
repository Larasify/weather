import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useState } from "react";
import { type setNewCoordType } from "~/pages";



interface PropInterface {
  coords: string[];
  setNewCoords: setNewCoordType;
}

const Map = (props: PropInterface) => {
  const [zoomLevel, setZoomLevel] = useState(14);
  if (!props.coords[0] || !props.coords[1]) return <div>hello</div>;
  const lat = parseFloat(props.coords[0]);
  const lon = parseFloat(props.coords[1]);

  function AddMarkerOnClick() {
    const map = useMapEvents({
      click(e) {
        const newCoords = e.latlng;
        props.setNewCoords(
          newCoords.lat.toPrecision(8).toString(),
          newCoords.lng.toPrecision(8).toString()
        );
      },
      zoomend: () => {
        console.log(map.getZoom());
        setZoomLevel(map.getZoom());
        console.log(zoomLevel);
       },
    });
    return null;
  }

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      attributionControl={false}
    >
      <AddMarkerOnClick />
      <TileLayer
        
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} draggable={false}>
        <Popup>Hey ! you found me</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
