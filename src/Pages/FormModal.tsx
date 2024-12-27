import React, { useState, useEffect } from "react";

// Définir le type des données d'une carte
type CardData = {
  title: string;
  description: string;
  image?: string;
};

// Définir les props du composant FormModal
type FormModalProps = {
  onAdd: (card: CardData) => void;
  cards: CardData[];
};

const FormModal: React.FC<FormModalProps> = ({ onAdd, cards }) => {
  const [category, setCategory] = useState<string>(""); // Catégorie sélectionnée
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>(""); // Titre généré automatiquement

  // Définir les images associées
  const imageMap: Record<string, string> = {
    Chambre: "/images/chambre.jpg",
    Salon: "/images/salon.jpg",
    Cuisine: "/images/cuisine.jpg",
  };

  // Générer un titre incrémenté en fonction de la catégorie
  const generateTitle = (category: string): string => {
    const count = cards.filter((card) => card.title.startsWith(category)).length;
    return `${category} ${count + 1}`;
  };

  // Mettre à jour le titre automatiquement lorsque la catégorie change
  useEffect(() => {
    if (category) {
      setTitle(generateTitle(category));
    }
  }, [category, cards]);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setCategory("");
    setDescription("");
    setTitle("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category) {
      const image = imageMap[category]; // Obtenir l'image associée à la catégorie
      onAdd({ title, description, image }); // Ajouter la carte
    }

    resetForm(); // Réinitialiser après soumission
    const modal = document.getElementById("card-form-modal");
    if (modal) modal.style.display = "none";
  };

  const handleClose = () => {
    resetForm(); // Réinitialiser lors de la fermeture du modal
    const modal = document.getElementById("card-form-modal");
    if (modal) modal.style.display = "none";
  };

  return (
    <div id="card-form-modal" className="modal2">
      <div className="modal-content2">
        <span className="close-btn" onClick={handleClose}>
          &times;
        </span>
        <h3>Ajouter une nouvelle pièce</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Type de pièce</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="styled-select"
            >
              <option value="">-- Choisir --</option>
              <option value="Chambre">Chambre</option>
              <option value="Salon">Salon</option>
              <option value="Cuisine">Cuisine</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              value={title}
              readOnly
              placeholder="Titre généré automatiquement"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Entrer une description"
              required
            />
          </div>
          <button type="submit" className="btn">
            Ajouter la pièce
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
