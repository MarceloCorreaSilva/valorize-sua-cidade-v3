import React from "react";
import { Product as ProductProps } from "../../Props";

interface TableProductProps {
  products?: Array<ProductProps>;
}

const Product: React.FC<TableProductProps> = ({ products }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Ano</th>
            <th>Jan</th>
            <th>Fev</th>
            <th>Mar</th>
            <th>Abr</th>
            <th>Mai</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Ago</th>
            <th>Set</th>
            <th>Out</th>
            <th>Nov</th>
            <th>Dez</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={index}>
              <td>
                <strong>{product?.name}</strong>
              </td>
              <td>{product?.year.toLocaleString('pt-br')}</td>
              <td>{product?.jan.toLocaleString('pt-br')}</td>
              <td>{product?.fev.toLocaleString('pt-br')}</td>
              <td>{product?.mar.toLocaleString('pt-br')}</td>
              <td>{product?.abr.toLocaleString('pt-br')}</td>
              <td>{product?.mai.toLocaleString('pt-br')}</td>
              <td>{product?.jun.toLocaleString('pt-br')}</td>
              <td>{product?.jul.toLocaleString('pt-br')}</td>
              <td>{product?.ago.toLocaleString('pt-br')}</td>
              <td>{product?.set.toLocaleString('pt-br')}</td>
              <td>{product?.out.toLocaleString('pt-br')}</td>
              <td>{product?.nov.toLocaleString('pt-br')}</td>
              <td>{product?.dez.toLocaleString('pt-br')}</td>
              <td>
                {(product?.jan +
                  product?.fev +
                  product?.mar +
                  product?.abr +
                  product?.mai +
                  product?.jun +
                  product?.jul +
                  product?.ago +
                  product?.set +
                  product?.out +
                  product?.nov +
                  product?.dez).toLocaleString('pt-br')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
