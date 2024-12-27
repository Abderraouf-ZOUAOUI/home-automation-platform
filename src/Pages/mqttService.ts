import mqtt from "mqtt";

/////////////// Gestion de la connexion HiveMQ
const options = {
  keepalive: 30,
  clientId: 'webClient_' + Math.random().toString(16).substr(2, 8),
  clean: true,
  reconnectPeriod: 5000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false,
};
const hivemqClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', options);

hivemqClient.on("connect", function () {
  console.log("Connecté au broker HiveMQ");
});
const topics = [
  "esp32/ars/light/stat",
  "esp32/ars/door/stat",
  "esp32/ars/security/stat",
  "esp32/ars/temperature",
  "esp32/ars/humidity",
  "esp32/ars/gaz",
];
topics.forEach(topic => hivemqClient.subscribe(topic));

/////////////////// Gestion de la connexion Mosquitto
const mosquittoOptions = {
  keepalive: 30,
  clientId: 'mosquitto_' + Math.random().toString(16).substr(2, 8),
  clean: true,
  reconnectPeriod: 5000,
  connectTimeout: 30 * 1000,
  rejectUnauthorized: false,
};
const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081";

class MqttService {
  client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect(MQTT_BROKER_URL, mosquittoOptions);

    this.client.on("connect", () => {
      console.log("Mosquitto Connected.");
      this.subscribeToTopics();
    });

    this.client.on("error", (err) => {
      console.error("Mosquitto Error:", err);
    });

    this.client.on("close", () => {
      console.log("Mosquitto Disconnected.");
    });
  }

  // Abonnement aux topics
  subscribeToTopics() {
    const topics = [
      "esp32/ars/light/stat",
      "esp32/ars/door/stat",
      "esp32/ars/security/stat",
      "esp32/ars/temperature",
      "esp32/ars/humidity",
      "esp32/ars/gaz",
    ];

    this.client.subscribe(topics, (err) => {
      if (err) console.error("Subscription error:", err);
      else console.log("Subscribed to topics:", topics);
    });
  }

  // Publication sur un topic
  publishMessage(topic: string, message: string) {
    this.client.publish(topic, message, (err) => {
      if (err) console.error("Error publishing:", err);
      else console.log(` mosquitto :Published to ${topic}: ${message}`);
    });
  }

  // Gestion des messages reçus
  onMessage(callback: (topic: string, message: string) => void) {
    this.client.on("message", (topic, message) => {
      callback(topic, message.toString());
    });
  }
}

// Export de `hivemqClient` pour une utilisation directe
export { hivemqClient };

// Singleton pour éviter les connexions multiples
export default new MqttService();
