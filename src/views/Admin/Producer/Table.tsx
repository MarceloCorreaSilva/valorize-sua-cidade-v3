import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

import { FiTrash2 } from "react-icons/fi";

import { Producer as ProducerProps } from "../../../Props";

import Layout from "../../Layouts/Admin";

const Table: React.FC = () => {
  const [producers, setProducers] = useState<ProducerProps[]>([]);
  const [refreshProducers, setRefreshProducers] = useState(false);

  useEffect(() => {
    api
      .get("/producers")
      .then((response) => setProducers(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setProducers([]);
    api
      .get("/producers")
      .then((response) => setProducers(response.data))
      .catch((error) => console.error(error));
  }, [refreshProducers]);

  useEffect(() => {
    console.log(producers);
  }, [producers]);

  return (
    <Layout>
      <div className="card">
        <div
          className="card-header"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <h3 className="card-title" style={{ fontSize: "30px" }}>
            Produtores
          </h3>

          <div className="card-tools">
            <a
              className="btn btn-block bg-gradient-primary"
              href="/admin/produtores/novo"
            >
              <i className="fas fa-edit"></i> Cadastrar Novo
            </a>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th style={{ width: 10 }}>#</th>
                  <th>Tipo</th>
                  <th>Nome</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {producers.map((producer: ProducerProps) => {
                  return (
                    <tr key={producer.id}>
                      <td>{producer.id}.</td>
                      <td>{producer.type.name}</td>
                      <td>
                        <Link to={`/admin/produtores/${producer.id}`}>
                          {producer.name}
                        </Link>
                      </td>
                      <td>{producer.latitude}</td>
                      <td>{producer.longitude}</td>
                      <td>
                        <Link
                          to="#"
                          // className="btn btn-outline-dange"
                          title="Excluir"
                          onClick={() => {
                            api
                              .delete(`/producers/${producer.id}`)
                              .then((response) => {
                                console.log(response.data);
                                setRefreshProducers(true);
                              })
                              .catch((error) => console.error(error));
                          }}
                        >
                          <FiTrash2 size={18} color="#d61515" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Table;
