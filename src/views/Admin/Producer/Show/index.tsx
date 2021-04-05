import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import Input from "../../../../shared/Input";

import { ProducerType as ProducerTypeProps } from "../../../../Props";

import Layout from "../../../Layouts/Admin";

import "./styles.css";

interface RouterProps {
  id: string;
}

const Show: React.FC = () => {
  const params = useParams<RouterProps>();

  const [types, setTypes] = useState<ProducerTypeProps[]>([]);

  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [state_registration, setStateRegistration] = useState("");
  const [employees, setEmployees] = useState(0);
  const [vehicles, setVehicles] = useState(0);
  const [total_area, setTotalArea] = useState(0);
  const [vegetable_garden_area, setVegetableGardenArea] = useState(0);
  const [orchard_area, setOrchardArea] = useState(0);
  const [irrigated, setIrrigated] = useState(false);
  const [covered_planting, setCoveredPlanting] = useState(false);
  const [commercialization, setCommercialization] = useState("");
  const [technical_assistance, setTechnicalAssistance] = useState("");

  useEffect(() => {
    api
      .get("producers-types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    api.get(`/producers/${params.id}`).then((response) => {
      setImage(response.data.image);
      setType(String(response.data.type.id));
      setOwner(response.data.owner);
      setName(response.data.name);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setStateRegistration(response.data.state_registration);
      setEmployees(response.data.employees);
      setVehicles(response.data.vehicles);
      setTotalArea(response.data.total_area);
      setVegetableGardenArea(response.data.vegetable_garden_area);
      setOrchardArea(response.data.orchard_area);
      setIrrigated(response.data.irrigated);
      setCoveredPlanting(response.data.covered_planting);
      setCommercialization(response.data.commercialization);
      setTechnicalAssistance(response.data.technical_assistance);
    });
  }, [params.id]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Layout>
      <div className="card">
        <div
          className="card-header"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <h3 className="card-title" style={{ fontSize: "30px" }}>
            <strong>{name}</strong>
          </h3>

          <div className="card-tools">
            <a
              className="btn btn-block bg-gradient-primary"
              href={`/admin/produtores/${params.id}/produtos`}
            >
              <i className="fas fa-plus"></i> Cadastrar Produtos
            </a>
          </div>
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

            <Input
              label="Nome Proprietário"
              name="owner"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              disabled
            />

            <div className="row">
              <div className="col-lg-6">
                <Input
                  label="Nome Propriedade"
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
              <div className="col-lg-3">
                <Input
                  label="Inscrição Estadual"
                  name="state_registration"
                  value={state_registration}
                  onChange={(event) => setStateRegistration(event.target.value)}
                  disabled
                />
              </div>
              <div className="col-lg-3"></div>
              <div className="col-lg-3"></div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Nº Empregados"
                  name="employees"
                  value={employees}
                  onChange={(event) => setEmployees(Number(event.target.value))}
                  disabled
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Nº Veiculos"
                  name="vehicles"
                  value={vehicles}
                  onChange={(event) => setVehicles(Number(event.target.value))}
                  disabled
                />
              </div>
              <div className="col-lg-3"></div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Area Total"
                  name="total_area"
                  value={total_area}
                  onChange={(event) => setTotalArea(Number(event.target.value))}
                  disabled
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Area de Horta"
                  name="vegetable_garden_area"
                  value={vegetable_garden_area}
                  onChange={(event) =>
                    setVegetableGardenArea(Number(event.target.value))
                  }
                  disabled
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Area de Pomar"
                  name="orchard_area"
                  value={orchard_area}
                  onChange={(event) =>
                    setOrchardArea(Number(event.target.value))
                  }
                  disabled
                />
              </div>
            </div>

            <div className="row" style={{ marginBottom: "10px" }}>
              <div className="col-lg-3">
                <div className="input-block">
                  <label htmlFor="irrigated">Plantio Irrigado</label>

                  <div className="button-select">
                    <button
                      type="button"
                      className={irrigated ? "active" : ""}
                      onClick={() => setIrrigated(true)}
                      disabled
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={!irrigated ? "active" : ""}
                      onClick={() => setIrrigated(false)}
                      disabled
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                {/* <Input
                  type="checkbox"
                  label="Cultivo Protegido"
                  name="covered_planting"
                  value={String(covered_planting)}
                  onChange={(event) =>
                    setCoveredPlanting(Boolean(event.target.value))
                  }
                /> */}
                <div className="input-block">
                  <label htmlFor="covered_planting">Cultivo Protegido</label>

                  <div className="button-select">
                    <button
                      type="button"
                      className={covered_planting ? "active" : ""}
                      onClick={() => setCoveredPlanting(true)}
                      disabled
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={!covered_planting ? "active" : ""}
                      onClick={() => setCoveredPlanting(false)}
                      disabled
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>

            <Input
              label="Comercialização"
              name="commercialization"
              value={commercialization}
              onChange={(event) => setCommercialization(event.target.value)}
              disabled
            />

            <div className="row">
              <div className="col-lg-12">
                <Input
                  label="Assistência Técnica"
                  name="technical_assistance"
                  value={technical_assistance}
                  onChange={(event) =>
                    setTechnicalAssistance(event.target.value)
                  }
                  disabled
                />
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
