/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../services/api";
import Input from "../../../shared/Input";

import { ProductType, ProductType as ProductTypeProps } from "../../../Props";

import Layout from "../../Layouts/Admin";
interface RouterProps {
  id: string;
}

const Create: React.FC = () => {
  const params = useParams<RouterProps>();
  const history = useHistory();

  const [errors, setErrors] = useState(false);
  const [types, setTypes] = useState<ProductTypeProps[]>([]);

  const [producer, setProducer] = useState(Number(params.id));
  const [type, setType] = useState(0);
  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [jan, setJan] = useState(0);
  const [fev, setFev] = useState(0);
  const [mar, setMar] = useState(0);
  const [abr, setAbr] = useState(0);
  const [mai, setMai] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [ago, setAgo] = useState(0);
  const [set, setSet] = useState(0);
  const [out, setOut] = useState(0);
  const [nov, setNov] = useState(0);
  const [dez, setDez] = useState(0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      jan + fev + mar + abr + mai + jun + jul + ago + set + out + nov + dez
    );
  }, [abr, ago, dez, fev, jan, jul, jun, mai, mar, nov, out, set]);

  useEffect(() => {
    const object = types.find((element) => element.id === type);
    const name = object?.name || "";
    setName(name);
  }, [name, type, types]);

  useEffect(() => {
    api
      .get("/products-types")
      .then((response) => setTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // const data = new FormData();
    // data.append("producer", producer);
    // data.append("type", type);
    // data.append("year", String(year));
    // data.append("jan", String(jan));
    // data.append("fev", String(fev));
    // data.append("mar", String(mar));
    // data.append("abr", String(abr));
    // data.append("mai", String(mai));
    // data.append("jun", String(jun));
    // data.append("jul", String(jul));
    // data.append("ago", String(ago));
    // data.append("set", String(set));
    // data.append("out", String(out));
    // data.append("nov", String(nov));
    // data.append("dez", String(dez));
    // data.append("total", String(total));

    console.log({
      producer,
      type,
      name,
      year,
      jan,
      fev,
      mar,
      abr,
      mai,
      jun,
      jul,
      ago,
      set,
      out,
      nov,
      dez,
      total,
    });

    await api
      .post("/products", {
        producer,
        type,
        name,
        year,
        jan,
        fev,
        mar,
        abr,
        mai,
        jun,
        jul,
        ago,
        set,
        out,
        nov,
        dez,
        total,
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          history.push(`/admin/produtores/${params.id}/produtos`);
        }
      })
      .catch((error) => {
        setErrors(true);
        console.log(error);
      });
  }

  return (
    <Layout>
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">
            <strong>Informe os dados do Novo Produto</strong>
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            {errors && errors === true && (
              <div className="alert alert-danger" role="alert">
                Informe todos os campos!
              </div>
            )}

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
                      setType(Number(ev.target.value))
                    }
                  >
                    <option value=""></option>
                    {types &&
                      types.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <Input
                  type="number"
                  label="Ano"
                  name="year"
                  value={year}
                  onChange={(event) => setYear(Number(event.target.value))}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Janeiro"
                  name="jan"
                  value={jan}
                  onChange={(event) => setJan(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Fevereiro"
                  name="fev"
                  value={fev}
                  onChange={(event) => setFev(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Março"
                  name="mar"
                  value={mar}
                  onChange={(event) => setMar(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Abril"
                  name="abr"
                  value={abr}
                  onChange={(event) => setAbr(Number(event.target.value))}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Maio"
                  name="mai"
                  value={mai}
                  onChange={(event) => setMai(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Junho"
                  name="jun"
                  value={jun}
                  onChange={(event) => setJun(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Julho"
                  name="jul"
                  value={jul}
                  onChange={(event) => setJul(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Agosto"
                  name="ago"
                  value={ago}
                  onChange={(event) => setAgo(Number(event.target.value))}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Setembro"
                  name="set"
                  value={set}
                  onChange={(event) => setSet(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Outubro"
                  name="out"
                  value={out}
                  onChange={(event) => setOut(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Novembro"
                  name="nov"
                  value={nov}
                  onChange={(event) => setNov(Number(event.target.value))}
                />
              </div>
              <div className="col-lg-3">
                <Input
                  type="number"
                  label="Dezembro"
                  name="dez"
                  value={dez}
                  onChange={(event) => setDez(Number(event.target.value))}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <Input
                  type="number"
                  label="Total"
                  name="total"
                  disabled={true}
                  value={total}
                  //   onChange={(event) => setTotal(Number(event.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
