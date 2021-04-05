import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import Input from "../../../../shared/Input";
import { HighlighterType as HighlighterTypeProps } from "../../../../Props";

import Layout from "../../../Layouts/Admin";

import './styles.css';

interface RouterProps {
  id: string;
}

const Show: React.FC = () => {
  const params = useParams<RouterProps>();

  const [types, setTypes] = useState<HighlighterTypeProps[]>([]);

  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/highlighters/${params.id}`).then((response) => {
      setImage(response.data.image);
      setType(String(response.data.type.id));
      setName(response.data.name);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setDescription(response.data.description);
    });
  }, [params.id]);

  useEffect(() => {
    api
      .get("highlighters-types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Layout>
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">
            <strong>
              Informe os dados do Novo Marcador / Estrutura Geográfica
            </strong>
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <img
                  className="img-fluid rounded"
                  src={image}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "25px",
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <select
                    className="form-control"
                    name="type"
                    id="type"
                    value={type && type}
                    onBlur={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                      setType(ev.target.value)
                    }
                    disabled
                  >
                    <option value=""></option>
                    {types &&
                      types.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Input
                  label="Nome"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled
                />
              </div>
              <div className="col-lg-3">
                <Input
                  label="Latitude"
                  name="latitude"
                  value={latitude}
                  onChange={(event) => setLatitude(event.target.value)}
                  disabled
                />
              </div>
              <div className="col-lg-3">
                <Input
                  label="Longitude"
                  name="longitude"
                  value={longitude}
                  onChange={(event) => setLongitude(event.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    cols={30}
                    rows={5}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div> */}
        </form>
      </div>
    </Layout>
  );
};

export default Show;
