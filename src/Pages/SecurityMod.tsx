import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./SecurityMod.css";
import mqttService, { hivemqClient } from "./mqttService";



const SecurityMod: React.FC = () => {
  const [syncedState, setSyncedState] = useState<boolean | null>(null); // État réel depuis le backend
  const [localState, setLocalState] = useState<boolean | null>(null);   // État local temporaire

  // Fonction pour récupérer l'état depuis le backend
  const fetchSecurityStatus = async () => {
    try {
      const response = await axios.get("https://home-automation-platform-api.vercel.app/api/security");
      if (response.data && typeof response.data.isDoorLocked === "boolean") {
        setSyncedState(response.data.isDoorLocked);
        setLocalState(response.data.isDoorLocked); // Synchroniser l'état local avec le backend
      } else {
        console.warn("Données non valides reçues :", response.data);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de l'état de sécurité :", err);
    }
  };

  // Charger l'état initial depuis le backend
  useEffect(() => {
    fetchSecurityStatus();
    const interval = setInterval(fetchSecurityStatus, 500); // Actualiser toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyer l'intervalle
  }, []);

  // Fonction pour publier sur les deux topics
  const publishToBothTopics = (enabled: boolean) => {
    const mosquittoTopic = "esp32/ars/security";
    const hiveMqTopic = "esp32/ars/sec/env";

    const mosquittoMessage = enabled ? "Enable" : "Disable";
    const hiveMqMessage = enabled ? "md_sec_Enabled" : "md_sec_Disabled";

    // Publication sur Mosquitto
    if ( mqttService.client && mqttService.client.connected) {
      mqttService.publishMessage(mosquittoTopic, mosquittoMessage);
      console.log(`Message publié sur mqtt : ${mosquittoMessage}`);
    } else {
      console.error("Mosquitto client non connecté.");
    }

    // Publication sur HiveMQ
    if (hivemqClient && hivemqClient.connected) {
      hivemqClient.publish(hiveMqTopic, hiveMqMessage, (err) => {
        if (err) {
          console.error("Erreur de publication sur HiveMQ :", err);
        } else {
          console.log(`Message publié sur HiveMQ : ${hiveMqMessage}`);
        }
      });
      hivemqClient.publish('esp32/ars/security', mosquittoMessage, function(err) {
        if (err) {
            console.error("Erreur de publication :", err);
        } else {
            console.log("Message publié ");
        }
    });
    }
    
  };

  // Fonction pour changer l'état localement et publier les messages
  const toggleLocalState = () => {
    setLocalState((prevState) => {
      const newState = !prevState;
      publishToBothTopics(newState);
      return newState;
    });
  };

  return (
    <div className="security-container">
      <div className="security-info">
      <h2>Bienvenue dans le Module de Sécurité</h2>
      <p>
        Ce module est conçu pour vous offrir un contrôle total et une vue
        d’ensemble des systèmes de sécurité de votre maison. Voici ce que vous
        pouvez faire :
      </p>

      <ul>
        <li>
          <strong>Gestion de la Porte :</strong> Verrouillez ou déverrouillez
          votre porte principale en un seul clic. L'icône indique l'état actuel
          de la porte :
          <ul>
            <li>
              <span className="icon locked"></span> **Verrouillée** : Une icône
              de cadenas vert.
            </li>
            <li>
              <span className="icon unlocked"></span> **Déverrouillée** : Une
              icône de cadenas rouge.
            </li>
          </ul>
        </li>
        
      
      </ul>

      <p>
        <strong>Astuce :</strong> Vérifiez toujours les statuts en temps réel
        pour vous assurer que votre maison est en sécurité !
      </p>
    </div>
      <div className="security-controls">
        <div className="control-item">
          <FontAwesomeIcon
            icon={localState ? faLock : faUnlock}
            size="2x"
            color={localState ? "#4CAF50" : "#FF5722"}
          />
          <p>{localState ? "Sécurité Active" : "Sécurité Désactivée"}</p>
          <button onClick={toggleLocalState}>
            {localState ? "Désactiver Sécurité" : "Activer Sécurité"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityMod;
