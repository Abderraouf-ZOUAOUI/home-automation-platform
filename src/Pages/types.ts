// types.ts
export interface Room {
    id: string;
    name: string;
    image: string;
  }
  
  export interface RoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (room: Room) => void;
  }