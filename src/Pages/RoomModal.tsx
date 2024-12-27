import React, { useState } from 'react';
import { Room, RoomModalProps } from './types';
import './Chambre.css';

const imageMap: Record<string, string> = {
  'salon': '/images/salon.jpg',
  'chambre': '/images/chambre.png',
  'arriere-cours': '/images/arriere-cours.jpg'
};

export const RoomModal: React.FC<RoomModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [roomName, setRoomName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedName = roomName.toLowerCase().trim();
    
    if (imageMap[normalizedName]) {
      const newRoom: Room = {
        id: Date.now().toString(),
        name: roomName,
        image: imageMap[normalizedName]
      };
      onAdd(newRoom);
      setRoomName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Ajouter une nouvelle pièce</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="roomName">Nom de la pièce:</label>
            <input
              id="roomName"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="salon, chambre, ou arriere-cours"
              required
            />
          </div>
          <div className="preview-images">
            {Object.entries(imageMap).map(([name, src]) => (
              <div 
                key={name} 
                className={`image-option ${roomName.toLowerCase() === name ? 'selected' : ''}`}
                onClick={() => setRoomName(name)}
              >
                <img src={src} alt={name} />
                <span>{name}</span>
              </div>
            ))}
          </div>
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  );
};
