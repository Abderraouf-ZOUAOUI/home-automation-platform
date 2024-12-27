import { Room } from "./types";

interface RoomCardProps {
    room: Room;
  }
  
  export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    return (
      <div className="room-card">
        <img src={room.image} alt={room.name} />
        <h3>{room.name}</h3>
        <button className="control-button">Controler</button>
      </div>
    );
  };
  