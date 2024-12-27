import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Device from "./Device";
import { faLightbulb, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { WiHumidity } from "react-icons/wi";
import { GiBedLamp, GiCctvCamera, GiCeilingLight, GiGasStove } from "react-icons/gi";
import axios from "axios";
import mqttService, { hivemqClient } from "./mqttService"; 
import ESP32CamStream from "./StreamingCanvas";

type Component = {
  name: string;
  isOn: boolean;
  unit?: string; // Optionnel
};

type Room = {
  roomName: string;
  components: Component[];
};

const Dashboard: React.FC = () => {

 
  

 //////////////////////////////////////////// ****** Intégration MQTT ******
  
 useEffect(() => {
  const handleMessage = (topic: string, message: string) => {
    const payload = message.toString();

    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.map((room) => {
        const updatedComponents = room.components.map((component: { name: string; isOn: boolean; unit: string; }) => {
          switch (topic) {
            case "esp32/ars/light/stat":
              if (component.name === "Bar Lamp") component.isOn = payload === "ON";
              break;
            case "esp32/ars/door/stat":
              if (component.name === "Port") component.isOn = payload === "open";
              break;
            case "esp32/ars/temperature":
              if (component.name === "Température") component.unit = `${payload}`;
              break;
            case "esp32/ars/gaz":
              if (component.name === "Gaz") component.unit = `${payload}`;
              break;
              case "esp32/ars/humidity":
                if (component.name === "Humidity") component.unit = `${payload}`;
                break;  
            default:
              break;
          }
          return component;
        });
        return { ...room, components: updatedComponents };
      });
      return updatedRooms;
    });
  };
  
  mqttService.onMessage(handleMessage);
  hivemqClient.on("message", (topic, message) => {
    console.log(`Message received through HiveMQ - Topic: ${topic}, Message: ${message.toString()}`);
    handleMessage(topic, message.toString());
   });

  // Nettoyage pour éviter les souscriptions multiples
  return () => {
    console.log("Nettoyage MQTT Dashboard");
    // Tu peux ajouter un mécanisme pour déconnecter si besoin.
  };
}, []);
const getMqttTopicForComponent = (componentName: string): string => {
  switch (componentName) {
    case "Bar Lamp":
      return "esp32/ars/light";
    case "Port":
      return "esp32/ars/door";
    case "Gaz":
      return "esp32/ars/gaz";
    case "Température":
      return "esp32/ars/temperature";
    case "Humidity":
      return "esp32/ars/humidity";
    default:
      return ""; // Retourne un topic vide si le composant est inconnu
  }
};


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////db
  const [rooms, setRooms] = useState<any[]>([]); // Liste des pièces récupérées depuis la DB
  const [showModal, setShowModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [temporaryRooms, setTemporaryRooms] = useState<Room[]>([]);


  const fetchRooms = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');
      
      if (!userEmail || !token) {
        alert("Please login to view your rooms.");
        return;
      }
  
      const response = await axios.get("http://localhost:5000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
          email: userEmail  // Send email in header
        }
      });
      
      if (response.data) {
        setRooms(response.data);
        setTemporaryRooms(response.data);
      }
  
    } catch (err) {
      console.error("Error fetching rooms:", err);
      if (err.response?.status === 404) {
        setRooms([]);
        setTemporaryRooms([]);
      } else {
        alert("Failed to fetch rooms. Please try again.");
      }
    }
  };
  

// Fetch rooms when component mounts and periodically
useEffect(() => {
  fetchRooms();
  const interval = setInterval(fetchRooms, 500); // Refresh every 10 seconds
  return () => clearInterval(interval);
}, []);

  // Fonction pour mettre à jour l’état temporaire d’un composant
  const toggleTemporaryState = (roomIndex: number, componentIndex: number) => {
    setTemporaryRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      const component = updatedRooms[roomIndex].components[componentIndex];
      
      // Inverser l'état du composant
      component.isOn = !component.isOn;
  
      // Publier un message MQTT
      const topic = getMqttTopicForComponent(component.name);
      const payload = (() => {
        if (component.name === "Port") {
          return component.isOn ? "open" : "close";
        }
        return component.isOn ? "ON" : "OFF";
      })();
  
      if (topic) {
        mqttService.publishMessage(topic, payload);
        console.log(`Message MQTT publié sur ${topic}: ${payload}`);
        hivemqClient.publish(topic, payload);
        
      }


  
      return updatedRooms;
    });
  };
  
  // Map component icons
  const getDeviceIcon = (name: string) => {
    switch (name) {
      case "Bar Lamp":
        return <FontAwesomeIcon icon={faLightbulb} />;
      case "Port":
        return <FontAwesomeIcon icon={faDoorOpen} />;
      case "Gaz":
        return <GiGasStove />;
      case "Température":
        return <FontAwesomeIcon icon={faThermometerHalf} />;
      case "Humidity":
        return  <WiHumidity />;
      case "tvCamera":
        return  <GiCctvCamera />;
      default:
        return <FontAwesomeIcon icon={faLightbulb} />;
    }
  };



  // Modified addRoom to include user email
  const addRoom = async () => {
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');
    
    if (!userEmail || !token) {
      alert("Please login to add rooms.");
      return;
    }

    const newComponents =  newRoomName === "Arrière-cour"
    ? [
        { name: "Spotlight", isOn: true },
        { name: "Port", isOn: true },
        { name: "tvCamera", isOn: true },
        { name: "Température", isOn: true, unit: "" },
      ]
    : [
        { name: "Bar Lamp", isOn: false },
        { name: "Port", isOn: true },
        { name: "Gaz", unit: "" },
        { name: "Température", unit: "" },
        { name: "Humidity", unit: ""  },
        { name: "tvCamera", isOn: true },
      ];;

    const newRoom = {
      roomName: newRoomName,
      components: newComponents,
      email: userEmail // Include user email in room data
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rooms",
        newRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            email: userEmail
          },
        }
      );
      
      setRooms(prevRooms => [...prevRooms, response.data]);
      setTemporaryRooms(prevRooms => [...prevRooms, response.data]);
      setShowModal(false);
      setNewRoomName("");
    } catch (err) {
      console.error("Error adding room:", err);
      alert("Failed to add room. Please try again.");
    }
  };


/////////////////////////////////////////////Streaming///////////////////////////////////////
const [showStreamingModal, setShowStreamingModal] = useState(false); // Streaming popup state

 
  ///////////////////////////////////////////////// Fetch Weather Data (API)//////////////////
  const [currCity, setCurrCity] = useState("Algeria");
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState<any>(null);
  
  const API_KEY = "64f60853740a1ee3ba20d0fb595c97d5";
  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Convert Timestamp to Local Time
  const convertTimeStamp = (timestamp: number, timezone: number) => {
    const convertTimezone = timezone / 3600; // seconds to hours
    const date = new Date(timestamp * 1000);
   
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
        convertTimezone
      )}`,
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  // Convert Country Code to Full Name
  const convertCountryCode = (country: string) => {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
  };

  // Fetch data on mount
  useEffect(() => {
    getWeather();
    
  }, [currCity, units]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  // conrtole
  

  return (
    <div className="container"> 
    <div className="weather__header">
        <form
          className="weather__search"
          onSubmit={(e) => {
            e.preventDefault();
            const searchValue = (
              e.currentTarget.elements.namedItem(
                "search"
              ) as HTMLInputElement
            ).value;
            setCurrCity(searchValue);
          }}
        >
          <input
            name="search"
            type="text"
            placeholder="Search for a city..."
            className="weather__searchform"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </form>
        <div className="weather__units">
          <span
            className={`weather_unit_celsius ${
              units === "metric" ? "active" : ""
            }`}
            onClick={() => setUnits("metric")}
          >
            &#176;C
          </span>
          <span
            className={`weather_unit_farenheit ${
              units === "imperial" ? "active" : ""
            }`}
            onClick={() => setUnits("imperial")}
          >
            &#176;F
          </span>
        </div>
      </div>
      <div className="weather__body">
        <h1 className="weather__city">
          {weatherData.name}, {convertCountryCode(weatherData.sys.country)}
        </h1>
        <div className="weather__datetime">
          {convertTimeStamp(weatherData.dt, weatherData.timezone)}
        </div>
        <div className="weather__forecast">
          <p>{weatherData.weather[0].main}</p>
        </div>
        <div className="weather__icon">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="weather icon"
          />
        </div>
        <p className="weather__temperature">
          {weatherData.main.temp.toFixed()}&#176;
        </p>
        <div className="weather__minmax">
          <p>Min: {weatherData.main.temp_min.toFixed()}&#176;</p>
          <p>Max: {weatherData.main.temp_max.toFixed()}&#176;</p>
        </div>
      </div>
      <div className="weather__info">
        <div className="weather__card">
          <i className="fa-solid fa-temperature-full"></i>
          <div>
            <p>Température 🌡</p>
            <p className="weather__realfeel">
              {weatherData.main.feels_like.toFixed()}&#176;
            </p>
          </div>
        </div>
        <div className="weather__card">
          <i className="fa-solid fa-droplet"></i>
          <div>
            <p>Humidity 💧</p>
            <p className="weather__humidity">{weatherData.main.humidity}%</p>
          </div>
        </div>
        <div className="weather__card">
          
          <div>
            <p>    Wind</p>
            <p className="weather__wind">
              {weatherData.wind.speed} {units === "imperial" ? "mph" : "m/s"}
            </p>
          </div>
        </div>
        <div className="weather__card">
          <i className=""></i>
          <div>
            <p>Presure</p>
            <p className="weather__pressure">
              {weatherData.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>
      <div className="controle">
        

        <div className="home-dashboard">
      {/* Welcome Section */}
      <div className="Bienvenue">
        <p className="welcome-title">Bienvenue 👋</p>
        <div className="text">
          <p>
            Bienvenue à la maison ! Vous êtes sur Home Assistant, où nous présentons les meilleures interfaces utilisateur créées par notre Group.
          </p>
          <p className="welcome-text">
      Explorez les différentes sections comme le <strong>Salon</strong> ou la <strong>Chambre</strong> pour visualiser et interagir avec vos dispositifs. Surveillez les données importantes comme la température, l'état des lumières, et bien plus encore, dans un design élégant et intuitif.
    </p>
   
          <a href="#" className="more-info-link">
            EN SAVOIR PLUS SUR HOME ASSISTANT
          </a>
        </div>
      </div>

      <div className="button-group">
  <button className="add-room-button" onClick={() => setShowModal(true)}>
    Add Room    
  </button>
  
</div>

      {/* Content Layout */}
      <div className="content">
  {/* Map through rooms */}
  {temporaryRooms.map((room, roomIndex) => (
        <div key={room.roomName} className="box">
          <div className="title">{room.roomName}</div>
          <div className="toutcomposant">
          {room.components.map((component, componentIndex) => (
        <Device
          key={component.name}
          icon={getDeviceIcon(component.name)}
          name={component.name}
          initialState={component.isOn}
          onClick={() => {
            if (component.name === "tvCamera") {
              // Open the streaming modal
              setShowStreamingModal(true);
            } else if (
              component.name !== "Gaz" &&
              component.name !== "Température" &&
              component.name !== "Humidity"
            ) {
              // Handle other devices
              toggleTemporaryState(roomIndex, componentIndex);
              console.log(`${component.name} clicked`);
            }
          }}
          unit={component.unit}
        />
      ))}
          </div>
        </div>
      ))}
  {/* Modal - Rendered Outside of Rooms */}
  {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Room</h2>
              <input
                type="text"
                placeholder="Enter Room Name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
              <div className="modal-buttons">
                <button className="modal-add-button" onClick={addRoom} disabled={!newRoomName}>
                  Add
                </button>
                <button className="modal-cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
         {/* Streaming Popup */}
         {showStreamingModal && (
  <>
    
    <div className="popup-overlay">
      <div className="popup-window">
      
        <button className="close-button" onClick={() => setShowStreamingModal(false)}>
          ✖
        </button>
        <ESP32CamStream />
      </div>
    </div>
  </>
)}

</div>

    </div>
      </div>
    </div>
  );
};
export default Dashboard;
