/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../../services/api";
import Input from "../../../../shared/Input";
import { OptionTypeBase as OptionType, ValueType } from "react-select";
import { Select } from "../../../../shared/Select";
import { FiPlus } from "react-icons/fi";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import Layout from "../../../Layouts/Admin";

import { ProducerType as ProducerTypeProps } from "../../../../Props";

interface RouterProps {
  type: string;
}

interface Filter {
  value: string;
  label: string;
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const Create: React.FC = () => {
  const history = useHistory();
  const params = useParams<RouterProps>();

  const [types, setTypes] = useState<ProducerTypeProps[]>([]);
  const [errors, setErrors] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [position, setPosition] = useState({
    latitude: -18.67592,
    longitude: -53.6398416,
  });

  const [type, setType] = useState(params.type);
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
  const [commercializations, setCommercializations] = useState<Filter[]>([]);
  const [technical_assistance, setTechnicalAssistance] = useState("");
  const [image, setImage] = useState<File | null>();

  useEffect(() => {
    api
      .get("producers-types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (commercializations && commercializations.length > 0) {
      setCommercialization(
        commercializations
          .map((commercialization) => commercialization.value)
          .join(", ")
      );
    } else {
      setCommercialization("");
    }
  }, [commercializations]);

  useEffect(() => {
    setLatitude(String(position.latitude));
    setLongitude(String(position.longitude));
  }, [position]);

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImage = Array.from(event.target.files);

    setImage(selectedImage[0]);

    const selectedImagesPreview = URL.createObjectURL(selectedImage[0]);

    setPreviewImage(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();
    data.append("type", type);
    data.append("owner", owner);
    data.append("name", name);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("state_registration", state_registration);
    data.append("vehicles", String(vehicles));
    data.append("employees", String(employees));
    data.append("total_area", String(total_area));
    data.append("vegetable_garden_area", String(vegetable_garden_area));
    data.append("orchard_area", String(orchard_area));
    data.append("irrigated", String(irrigated));
    data.append("covered_planting", String(covered_planting));
    data.append("commercialization", commercialization);
    data.append("technical_assistance", technical_assistance);
    image && data.append("image", image);

    // console.log({
    //   type, image
    // });
    // return;

    await api
      .post("/producers", data)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          history.push("/admin/produtores");
        }
      })
      .catch((error) => {
        setErrors(true);
        console.log(error);
      });
  }

  function handleReset() {
    setImage(null);
    setPreviewImage("");
    setOwner("");
    setName("");
    setLatitude("");
    setLongitude("");
    setStateRegistration("");
    setEmployees(0);
    setVehicles(0);
    setTotalArea(0);
    setVegetableGardenArea(0);
    setOrchardArea(0);
    setIrrigated(false);
    setCoveredPlanting(false);
    setCommercialization("");
    setCommercializations([]);
    setTechnicalAssistance("");
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(event) {
        // map.locate();
        const { lat, lng } = event.latlng;
        setPosition({ latitude: lat, longitude: lng });
      },
      locationfound(event) {
        map.flyTo(event.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker
        position={[position.latitude, position.longitude]}
        icon={DefaultIcon}
      />
    );
  }

  return (
    <Layout>
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">
            <strong>Informe os dados do Novo Produtor</strong>
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {errors && errors === true && (
              <div className="alert alert-danger" role="alert">
                Informe todos os campos!
              </div>
            )}

            <MapContainer
              center={[position.latitude, position.longitude]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <LocationMarker />
            </MapContainer>

            {/* <Input
              type="file"
              label="Imagem"
              name="image"
              // value={image}
              onChange={handleSelectImage}
            /> */}

            {/* 
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <select
                    className="form-control"
                    name="type"
                    id="type"
                    // onChange={() => setType}
                    onBlur={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                      setType(ev.target.value)
                    }
                    value={type}
                  >
                    <option value=""></option>
                    {types &&
                      types.map((type) => (
                        <option value={type.id}>{type.name}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div> */}

            <div className="input-block">
              <label htmlFor="images">Selecionar Foto</label>

              <div className="images-container">
                {previewImage && <img src={previewImage} alt={name} />}
                <label htmlFor="image" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input onChange={handleSelectImage} type="file" id="image" />
            </div>

            <Input
              label="Nome Proprietário"
              name="owner"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
            />

            <div className="row">
              <div className="col-lg-6">
                <Input
                  label="Nome Propriedade"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Nº Veiculos"
                  name="vehicles"
                  value={vehicles}
                  onChange={(event) => setVehicles(Number(event.target.value))}
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
                />
              </div>
            </div>

            <div className="row" style={{ marginBottom: "10px" }}>
              <div className="col-lg-3">
                <div className="input-block">
                  <label htmlFor="irrigated">Cultivo Irrigado</label>

                  <div className="button-select">
                    <button
                      type="button"
                      className={irrigated ? "active" : ""}
                      onClick={() => setIrrigated(true)}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={!irrigated ? "active" : ""}
                      onClick={() => setIrrigated(false)}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="input-block">
                  <label htmlFor="covered_planting">Cultivo Protegido</label>

                  <div className="button-select">
                    <button
                      type="button"
                      className={covered_planting ? "active" : ""}
                      onClick={() => setCoveredPlanting(true)}
                    >
                      Sim
                    </button>
                    <button
                      type="button"
                      className={!covered_planting ? "active" : ""}
                      onClick={() => setCoveredPlanting(false)}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>

            {/* <Input
              label="Comercialização"
              name="commercialization"
              value={commercialization}
              onChange={(event) => setCommercialization(event.target.value)}
            /> */}

            <div className="row" style={{ marginBottom: "10px" }}>
              <div className="col-lg-12">
                <div className="input-block">
                  <label htmlFor="commercializations">
                    Canais de comercialização...
                  </label>
                  <Select
                    name="commercializations"
                    placeholder=""
                    isMultiple={true}
                    value={commercializations}
                    options={[
                      {
                        value: "PAA",
                        label: "PAA",
                      },
                      {
                        value: "PNAE",
                        label: "PNAE",
                      },
                      {
                        value: "FEIRA",
                        label: "FEIRA",
                      },
                    ]}
                    onChange={(selectedOption: ValueType<OptionType>) => {
                      setCommercializations(
                        selectedOption?.map((selected: OptionType) => selected)
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <Input
                  label="Assistência Técnica"
                  name="technical_assistance"
                  value={technical_assistance}
                  onChange={(event) => setTechnicalAssistance(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              Salvar
            </button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={handleReset}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
