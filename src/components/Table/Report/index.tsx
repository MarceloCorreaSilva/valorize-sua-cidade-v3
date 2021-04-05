import React from "react";

import {
  Producer as ProducerProps,
  Highlighter as HighlighterProps,
} from "../../../Props";

// CSS
import "./styles.css";

interface ReportProps {
  producers: Array<ProducerProps>;
  highlighters: Array<HighlighterProps>;
}
interface TableProps {
  producer: ProducerProps;
}

const Report: React.FC<ReportProps> = ({ producers, highlighters }) => {
  return (
    <div className="report-container">
      {producers.map((producer) => (
        <>
          <div key={producer.id} className="card">
            <div className="card-header">
              <h3 className="card-title">
                {producer.id} - {producer.name}
              </h3>
              <p className="card-text">
                <strong>Proprietário(a):</strong> {producer.owner} /{" "}
                <strong>Irrigado:</strong>{" "}
                {producer.irrigated === true ? "Sim" : "Não"} /{" "}
                <strong>Cultivo protegido:</strong>{" "}
                {producer.covered_planting === true ? "Sim" : "Não"} /{" "}
                <strong>Veiculos:</strong> {producer.vehicles} /{" "}
                <strong>Comercialização:</strong> {producer.commercialization}
              </p>
            </div>
            <div className="card-body">
              <img
                src={`${producer.image}`}
                alt={producer.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <Table key={producer.id} producer={producer} />
            </div>
          </div>
          <hr />
        </>
      ))}

      {highlighters.map((highlighter) => (
        <>
          <div key={highlighter.id} className="card">
            <div className="card-header">
              <h3 className="card-title">{highlighter.name}</h3>
            </div>
            <div className="card-body">
              <img
                src={highlighter.image}
                alt={highlighter.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
              <p className="card-text">
                <strong>Descrição:</strong> {highlighter.description}
              </p>
            </div>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
};

const Table: React.FC<TableProps> = ({ producer }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm" id="datatable" style={{
        fontSize: '15px'
      }}>
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
          {producer.products &&
            producer.products.map((product, index) => (
              <tr key={index}>
                <td>
                  <strong>{product.name}</strong>
                </td>
                <td>{product.year}</td>
                <td>{product.jan}</td>
                <td>{product.fev}</td>
                <td>{product.mar}</td>
                <td>{product.abr}</td>
                <td>{product.mai}</td>
                <td>{product.jun}</td>
                <td>{product.jul}</td>
                <td>{product.ago}</td>
                <td>{product.set}</td>
                <td>{product.out}</td>
                <td>{product.nov}</td>
                <td>{product.dez}</td>
                <td>{product.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
