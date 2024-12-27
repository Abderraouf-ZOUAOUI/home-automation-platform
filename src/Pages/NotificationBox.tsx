import React from "react";
import "./NotificationBox.css";

interface NotificationBoxProps {
  title: string;
  message: string;
  timestamp: string;
}

const NotificationBox: React.FC<NotificationBoxProps> = ({ title, message, timestamp }) => {
  return (
    <div className="notification-box">
      <h3>{title}</h3>
      <p>{message}</p>
      <p className="timestamp">{timestamp}</p>
    </div>
  );
};

export default NotificationBox;
