import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";

import {
  //   Highlighter as HighlighterProps,
  HighlighterType,
} from "../../../Props";

import { FiTrash2 } from "react-icons/fi";

import Layout from "../../Layouts/Admin";

export interface HighlighterProps {
  id: number;
  type: HighlighterType;
  image: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Table: React.FC = () => {
  const [highlighters, setHighlighters] = useState<HighlighterProps[]>([]);

  useEffect(() => {
    api.get("/highlighters").then((response) => {
      console.log(response.data);
      setHighlighters(response.data);
    });
  }, []);

  return (
    <Layout>
      <div className="card">
        <div
          className="card-header"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <h3 className="card-title" style={{ fontSize: "30px" }}>
            Marcadores
          </h3>
          <div className="card-tools">
            <a
              className="btn btn-block bg-gradient-primary"
              href="/admin/marcadores/novo"
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
                {highlighters.map((highlighter) => {
                  return (
                    <tr key={highlighter.id}>
                      <td>{highlighter.id}.</td>
                      <td>{highlighter.type.name}</td>
                      <td>
                        <Link to={`/admin/marcadores/${highlighter.id}`}>
                          {highlighter.name}
                        </Link>
                      </td>
                      <td>{highlighter.latitude}</td>
                      <td>{highlighter.longitude}</td>
                      <td>
                        <Link
                          to="#"
                          // className="btn btn-outline-dange"
                          title="Excluir"
                          onClick={() => {
                            api
                              .delete(`/highlighters/${highlighter.id}`)
                              .then((response) => {
                                console.log(response.data);
                                // setRefreshProducers(true);
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
