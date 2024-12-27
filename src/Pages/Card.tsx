import React from "react";

// Définir le type des props du composant Card
type CardProps = {
  data: {
    title: string;
    description: string;
    image?: string; // L'image est facultative
  };
  onDelete: (title: string) => void; // Fonction pour supprimer une carte
};

const Card: React.FC<CardProps> = ({ data, onDelete }) => {
  const { title, description, image } = data;

  return (
    <div className="card">
      <div className="card-image-container">
        {image && <img src={image} alt="Room" />}
        <span className="delete-icon" onClick={() => onDelete(title)}>
          &#10005;
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#" className="card__button">
        Controller
      </a>
    </div>
  );
};

export default Card;
