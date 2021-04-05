/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link, useParams } from "react-router-dom";

import {
  Producer as ProducerProps,
  Product as ProductProps,
} from "../../../Props";
import ProductTable from "../../../components/Table/Product";

import Layout from "../../Layouts/Admin";

interface RouterProps {
  id: string;
}

const Product: React.FC = () => {
  const params = useParams<RouterProps>();
  const [producer, setProducer] = useState<ProducerProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    api
      .get(`/producers/${params.id}`)
      .then((response) => {
        setProducer(response.data);
        setProducts(response.data.products);
      })
      .catch((error) => console.error(error));
  }, [params.id]);

  return (
    <Layout>
      <div className="card">
        <div
          className="card-header"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <h3 className="card-title" style={{ fontSize: "30px" }}>
            Produtos
          </h3>

          <div className="card-tools">
            <a
              className="btn btn-block bg-gradient-primary"
              href={`/admin/produtores/${params.id}/produtos/novo`}
            >
              <i className="fas fa-edit"></i> Cadastrar Novo
            </a>
          </div>
        </div>
        <div className="card-body p-0">
          <ProductTable products={products} />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
