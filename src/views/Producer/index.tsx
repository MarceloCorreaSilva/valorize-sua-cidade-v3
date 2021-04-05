import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import Sidebar from "../../shared/Sidebar";
import MapContainer from "../../shared/MapContainer";

import { Producer as ProducerProps } from "../../Props";

// CSS
import "./styles.css";
import "leaflet/dist/leaflet.css";
import ImageDefault from "../../shared/ImageDefault";
import Product from "../../components/Table/Product";

interface RouteParams {
  code: string;
  id: string;
}

const Producer: React.FC = () => {
  const params = useParams<RouteParams>();
  const [producer, setProducer] = useState<ProducerProps>();

  useEffect(() => {
    api
      .get(`producers/${params.id}`)
      .then((response) => setProducer(response.data))
      .then((error) => console.log(error));
  }, [params.id]);

  return (
    <div id="page-producer">
      <Sidebar />

      <main>
        <div className="producer-details">
          {producer?.image ? (
            <img src={producer?.image} alt={producer.name} />
          ) : (
            <ImageDefault />
          )}

          <div className="producer-details-content">
            <h1>{producer?.name}</h1>
            <p>
              <strong>Proprietario:</strong> {producer?.owner}
            </p>
            <p>
              <strong>Inscrição Estadual:</strong>{" "}
              {producer?.state_registration}
            </p>
            <p>
              <strong>Area Total:</strong> {producer?.total_area}
            </p>
            <p>
              <strong>Area de Horta:</strong> {producer?.vegetable_garden_area}
            </p>
            <p>
              <strong>Area de Pomar:</strong> {producer?.orchard_area}
            </p>
            <p>
              <strong>Nº Empregados:</strong> {producer?.employees}
            </p>
            <p>
              <strong>Nº Veículos:</strong> {producer?.vehicles}
            </p>
            <p>
              <strong>Plantio Irrigado:</strong>{" "}
              {producer?.irrigated === true ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Plantio Coberto:</strong>{" "}
              {producer?.covered_planting === true ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Comercialização:</strong> {producer?.commercialization}
            </p>
            {/* "products": [] */}

            <Product products={producer?.products} />

            <hr/>

            {producer && (
              <MapContainer
                latitude={producer.latitude}
                longitude={producer.longitude}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Producer;
