import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";

import {
  //   Highlighter as HighlighterProps,
  HighlighterType,
} from "../../../Props";

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

const Highlighter: React.FC = () => {
  const [highlightersTypes, setHighlightersTypes] = useState<
    HighlighterProps[]
  >([]);

  useEffect(() => {
    api.get("/highlighters-types").then((response) => {
      console.log(response.data);
      setHighlightersTypes(response.data);
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
            Cadastrar Marcadores
          </h3>
          <div className="card-tools">
            <Link
              className="btn btn-block bg-gradient-primary"
              to="/admin/marcadores/relatorio"
            >
              <i className="fas fa-edit"></i> Relatório
            </Link>
          </div>
        </div>
        <div className="card-body p-10" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '25px 25px'
        }}>
          {highlightersTypes &&
            highlightersTypes.map((type) => (
              <Link to={`/admin/marcadores/${type.id}/novo`} className="btn btn-outline-primary">
                {type.name}
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Highlighter;
