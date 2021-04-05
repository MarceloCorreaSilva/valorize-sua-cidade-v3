/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import data from "../../data/geojson/geojs-100-mun.json";

import Card from "../../shared/Card";

import {
  Producer as ProducerProps,
  Highlighter as HighlighterProps,
} from "../../Props";

// CSS
import "./styles.css";
import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

interface MapProps {
  producers: Array<ProducerProps>;
  highlighters: Array<HighlighterProps>;
  cityCodeID: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

const Leaflet: React.FC<MapProps> = ({
  producers,
  highlighters,
  cityCodeID,
}) => {
  const [geoJSON, setGeoJSON] = useState<GeoJSON.FeatureCollection<any>>(
    data as GeoJSON.FeatureCollection<any>
  );
  // const [geoJSON, setGeoJSON] = useState<GeoJSON.FeatureCollection<any>>({
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       geometry: { type: "Polygon", coordinates: [] },
  //       properties: { codarea: "5003900", centroide: [] },
  //       type: "Feature",
  //     },
  //   ],
  // });
  const [cityCode, setCityCode] = useState(cityCodeID);
  const [city, setCity] = useState(0);
  const [coordinates, setCoordinates] = useState<LatLng>({
    lat: -18.6795541,
    lng: -53.6474346,
  });

  useEffect(() => {
    const city = geoJSON.features.findIndex(
      (city: any) => city.properties.id === cityCode
    );
    setCity(city);
  }, [cityCode, geoJSON]);

  // useEffect(() => {
  //   Axios.get(
  //     "https://servicodados.ibge.gov.br/api/v2/malhas/5101704/?formato=application/vnd.geo+json"
  //   )
  //     .then((response) => {
  //       setGeoJSON(
  //         response.data as GeoJSON.FeatureCollection<any>
  //       );
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // useEffect(() => { console.log(geoJSON); }, [geoJSON]);

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={9}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <GeoJSON
        key="map"
        data={geoJSON.features[city]}
        style={{
          color: "#1b779b",
          opacity: 1,
          weight: 2,
        }}
      />

      {/* <GeoJSON
        key="map"
        data={geoJSON.features[0]}
        style={{
          color: "#b41e1e",
          opacity: 1,
          weight: 2,
        }}
      /> */}

      {highlighters &&
        highlighters.map((highlighter) => (
          <Marker
            key={`${highlighter.type}-${highlighter.id}-${highlighter.name}`}
            position={[highlighter.latitude, highlighter.longitude]}
            icon={DefaultIcon}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              <Card
                image={highlighter.image}
                // image={`https://valorize-sua-cidade.herokuapp.com/uploads/${highlighter.image}`}
                title={highlighter.name}
                description={highlighter.description}
                url={`/estruturas/${highlighter.id}`}
              />
            </Popup>
          </Marker>
        ))}

      {producers &&
        producers.map((producer) => (
          <Marker
            key={`${producer.type}-${producer.id}`}
            position={[producer.latitude, producer.longitude]}
            icon={DefaultIcon}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              <Card
                image={`${producer.image}`}
                title={producer.name}
                description={producer.owner}
                url={`/produtores/${producer.id}`}
              />
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Leaflet;
