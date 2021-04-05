/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { FiPlus } from "react-icons/fi";

import { HighlighterType as HighlighterTypeProps } from "../../../../Props";
import api from "../../../../services/api";
import Input from "../../../../shared/Input";

import Layout from "../../../Layouts/Admin";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import "./styles.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

interface RouterProps {
  type: string;
}

const Create: React.FC = () => {
  const history = useHistory();
  const params = useParams<RouterProps>();

  const [errors, setErrors] = useState(false);
  const [types, setTypes] = useState<HighlighterTypeProps[]>([]);
  const [position, setPosition] = useState({
    latitude: -18.67592,
    longitude: -53.6398416,
  });
  const [previewImage, setPreviewImage] = useState<string>("");

  const [type, setType] = useState(params.type);
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>();

  useEffect(() => {
    api
      .get("highlighters-types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setLatitude(String(position.latitude));
    setLongitude(String(position.longitude));
  }, [position]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();
    data.append("type", type);
    data.append("name", name);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("description", description);
    image && data.append("image", image);

    // console.log({
    //   type, name, latitude, longitude, description, image
    // });

    await api
      .post("/highlighters", data)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          history.push("/admin/marcadores");
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
    setName("");
    setLatitude("");
    setLongitude("");
    setDescription("");
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImage = Array.from(event.target.files);

    setImage(selectedImage[0]);

    const selectedImagesPreview = URL.createObjectURL(selectedImage[0]);

    setPreviewImage(selectedImagesPreview);
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
            <strong>
              Informe os dados do Novo Marcador / Estrutura Geográfica
            </strong>
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

            {/* <Input
              type="file"
              label="Imagem"
              name="image"
              // value={image}
              onChange={handleSelectImage}
            /> */}

            {/* <div className="row">
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

            <div className="row">
              <div className="col-lg-6">
                <Input
                  label="Nome"
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
              <div className="col-lg-12">
                <div className="form-group">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    cols={30}
                    rows={5}
                    defaultValue={""}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
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
