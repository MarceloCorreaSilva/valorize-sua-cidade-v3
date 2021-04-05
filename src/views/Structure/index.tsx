import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import MapContainer from "../../shared/MapContainer";
import Sidebar from "../../shared/Sidebar";
import ImageDefault from "../../shared/ImageDefault";

interface RouteParams {
  code: string;
  id: string;
}

interface StructureProps {
  id: number;
  type: string;
  name: string;
  image: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Structure: React.FC = () => {
  const params = useParams<RouteParams>();
  const [structure, setStructure] = useState<StructureProps>();

  useEffect(() => {
    api
      .get(`highlighters/${params.id}`)
      .then((response) => setStructure(response.data))
      .then((error) => console.log(error));
  }, [params.id]);

  // useEffect(() => {
  //   console.log(structure);
  // }, [structure]);

  return (
    <div id="page-producer">
      <Sidebar />

      <main>
        <div className="producer-details">
          {structure?.image ? (
            <img src={structure?.image} alt={structure.name} />
          ) : (
            <ImageDefault />
          )}

          <div className="producer-details-content">
            <h1>{structure?.name}</h1>
            <p>
              <strong>Descrição:</strong>
            </p>
            <p>{structure?.description}</p>

            {structure && (
              <MapContainer
                latitude={structure.latitude}
                longitude={structure.longitude}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Structure;
