import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

import { ProducerType as ProducerTypeProps } from "../../../Props";

import Layout from "../../Layouts/Admin";

const Producer: React.FC = () => {
  const [producersTypes, setProducersTypes] = useState<ProducerTypeProps[]>([]);

  useEffect(() => {
    api
      .get("/producers-types")
      .then((response) => setProducersTypes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
     <div className="card">
        <div
          className="card-header"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <h3 className="card-title" style={{ fontSize: "30px" }}>
            Cadastrar Produtores
          </h3>
          <div className="card-tools">
            <Link
              className="btn btn-block bg-gradient-primary"
              to="/admin/produtores/relatorio"
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
          {producersTypes &&
            producersTypes.map((type) => (
              <Link to={`/admin/produtores/${type.id}/novo`} className="btn btn-outline-primary">
                {type.name}
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Producer;
