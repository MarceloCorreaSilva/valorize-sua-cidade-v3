import React from "react";
import { MapContainer as Map, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// CSS
import "./styles.css";
import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

interface MapContainerProps {
  latitude: number;
  longitude: number;
}

const MapContainer: React.FC<MapContainerProps> = ({ latitude, longitude }) => {
  return (
    <div className="map-container">
      <Map
        center={[latitude, longitude]}
        zoom={10}
        style={{ width: "100%", height: 200 }}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          interactive={false}
          icon={DefaultIcon}
          position={[latitude, longitude]}
        />
      </Map>

      <footer>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          target="blank"
          rel="noopener noreferrer"
        >
          Ver rotas no Google Maps
        </a>
      </footer>
    </div>
  );
};

export default MapContainer;
