import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

// import { Container } from './styles';

interface CardProps {
  image?: string;
  title: string;
  description: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, url }) => {
  return (
    <div className="card" style={{ width: "20rem" }}>
      {/* <img
          src="https://geo1.ggpht.com/maps/photothumb/fd/v1?bpb=ChEKD3NlYXJjaC5nd3MtcHJvZBIgChIJCcdyAMU1dpMRBpzPjnJ9_G8qCg0AAAAAFQAAAAAaBgjwARCYAw&gl=BR"
          className="card-img-top"
          alt="..."
          style={{
            width: "100%",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        /> */}

      {image ? (
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{
            width: "100%",
            height: "180",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        />
      ) : (
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="180"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Placeholder: Image cap"
        >
          <rect width="100%" height="100%" fill="#868e96"></rect>
        </svg>
      )}

      <div className="card-body">
        <h1 style={{ fontSize: "1.1rem" }}>{title}</h1>
        <p className="card-text" style={{ fontSize: "0.9rem" }}>
          {description}
        </p>
        <Link to={url} className="btn btn-primary">
          <FiPlus size={20} color="#FFF" /> Informações
        </Link>
      </div>
    </div>
  );
};

export default Card;
