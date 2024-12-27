import React, { useState, useEffect } from "react";
import "./Chambre.css";
import Card from "./Card";
import FormModal from "./FormModal";

// Définition du type pour une carte
type CardData = {
  title: string;
  description: string;
  image?: string; // Facultatif si certaines cartes n'ont pas d'image
};

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards") || "[]") as CardData[];
    setCards(savedCards);
  }, []);

  const addCard = (cardData: CardData) => {
    const newCards = [...cards, cardData];
    setCards(newCards);
    localStorage.setItem("cards", JSON.stringify(newCards));
  };

  const deleteCard = (title: string) => {
    const updatedCards = cards.filter((card) => card.title !== title);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <div>
      <header className="appbar">
        <div>
        <h1>Bienvenue dans votre Maison</h1>
        <button
          onClick={() => {
            const modal = document.getElementById("card-form-modal");
            if (modal) modal.style.display = "block";
          }}
          className="btn"
        >
          Ajouter une pièce
        </button>
        </div>
      </header>
      <div className="container">
        <div className="card-slider">
          <div className="cards-container">
            {cards.map((card, index) => (
              <Card key={index} data={card} onDelete={deleteCard} />
            ))}
          </div>
        </div>
      </div>
      <FormModal onAdd={addCard} cards={cards} />
    </div>
  );
};

export default App;
