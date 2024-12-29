const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const roomRoutes = require('./routes/roomRoutes');
const Security = require('./routes/routeSecurity');
const EmployeeModel = require("./model/Employee");
const passwordResetRoutes = require('./routes/passwordReset');
const Room = require('./models/Room');
const mqtt = require('mqtt');
const app = express();


app.use(cors({
    origin: "https://home-automation-phi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Date", "X-Api-Version"]
}));
app.use(bodyParser.json());

mongoose
  .connect('mongodb://home_automation:project_web_2025@cluster0-shard-00-00.nslsr.mongodb.net:27017,cluster0-shard-00-01.nslsr.mongodb.net:27017,cluster0-shard-00-02.nslsr.mongodb.net:27017/smartHome?ssl=true&replicaSet=atlas-it0wjd-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/security', Security);
app.use('/', passwordResetRoutes);

// Initialize security state
const initializeSecurityState = async () => {
  try {
    const existingState = await Security.findOne();
    if (!existingState) {
      const defaultState = new Security({ isDoorLocked: true });
      await defaultState.save();
      console.log('Security state initialized with default values.');
    }
  } catch (err) {
    console.error('Erreur lors de linitialisation de létat de sécurité:', err.message);
  }
};

initializeSecurityState();




// Route pour l'inscription (enregistrement des données)
app.post("/register", (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    // Vérifier si l'email existe déjà
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Si l'utilisateur existe déjà, renvoyer un message d'erreur
                res.status(400).json({ message: "Email déjà utilisé." });
            } else {
                // Hachage du mot de passe avant de l'enregistrer
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        res.status(500).json({ message: "Erreur lors du hachage du mot de passe", error: err });
                    } else {
                        // Créer un nouvel utilisateur avec le mot de passe haché
                        EmployeeModel.create({ firstName, lastName, phoneNumber, email, password: hashedPassword })
                            .then(employee => res.status(201).json(employee))
                            .catch(err => res.status(500).json({ message: "Erreur d'inscription", error: err }));
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur interne du serveur", error: err });
        });
});





// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Compare entered password with hashed password
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(500).json({ message: "Erreur lors de la comparaison du mot de passe", error: err });
                    } else if (result) {
                        // If password is correct, get user's rooms
                        Room.find({ userId: user._id })
                            .then(rooms => {
                                // Respond with success message, token, and user's rooms
                                const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '8h' });
                                res.json({
                                    message: "Success",
                                    token: token,
                                    rooms: rooms
                                });
                            })
                            .catch(err => {
                                res.status(500).json({ message: "Erreur lors de la récupération des chambres", error: err });
                            });
                    } else {
                        // If password is incorrect
                        res.json("Mot de passe incorrect");
                    }
                });
            } else {
                // If user doesn't exist
                res.json("Aucun utilisateur trouvé");
            }
        })
        .catch(err => res.status(500).json({ message: "Erreur interne du serveur", error: err }));
});




// Schéma et modèle Mongoose
const payloadSchema = new mongoose.Schema({
    topic: { type: String, required: true, unique: true },
    payload: { type: String, required: true },
    testPayload: { type: String, required: false },  // Variable pour test
    timestamp: { type: Date, default: Date.now }
});

const Payload = mongoose.model('Payload', payloadSchema);

// Options pour les connexions MQTT
const mqttOptions = {
    keepalive: 30,
    clientId: 'webClient_' + Math.random().toString(16).substr(2, 8),
    clean: true,
    reconnectPeriod: 5000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false
};

// Connexion aux brokers MQTT
const mosquittoClient = mqtt.connect('wss://test.mosquitto.org:8081', mqttOptions);
const hivemqClient = mqtt.connect('wss://broker.hivemq.com:8884/mqtt', mqttOptions);

// Liste des topics à souscrire
const topics = [
    'esp32/ars/light/stat',
    'esp32/ars/door/stat',
    'esp32/ars/security/stat',
    'esp32/ars/temperature',
    'esp32/ars/humidity',
    'esp32/ars/gaz'
];

// Gestion de la connexion et des souscriptions pour Mosquitto
mosquittoClient.on('connect', () => {
    console.log("Connecté à Mosquitto");
    mosquittoClient.subscribe(topics);
});

// Gestion de la connexion et des souscriptions pour HiveMQ
hivemqClient.on('connect', () => {
    console.log("Connecté à HiveMQ");
    hivemqClient.subscribe(topics);
});



const topicToComponentMap = {
  'esp32/ars/light/stat': 'Bar Lamp',      
  'esp32/ars/door/stat': 'Port',        
  'esp32/ars/security/stat': 'security', 
  'esp32/ars/temperature': 'Température', 
  'esp32/ars/humidity': 'Humidity',     
  'esp32/ars/gaz': 'Gaz'                 
};

async function updateStatus(topic, payload) {
    console.log(`\n--- Début de mise à jour pour topic: ${topic} ---`);
    console.log(`Payload reçu: ${payload}`);
    
    try {
        // Update Payload collection
        const updatedPayload = await Payload.findOneAndUpdate(
            { topic },
            {
                payload,
                testPayload: `${payload}`,
                timestamp: new Date()
            },
            {
                upsert: true,
                new: true
            }
        );
        
        // Update Room collection
        const componentName = topicToComponentMap[topic];
        console.log(`Nom du composant mappé: ${componentName}`);
        
        if (componentName) {
            // Logique spécifique pour le mode sécurité
            if (componentName === 'security') {
                // Mise à jour du modèle Security
                await Security.findOneAndUpdate(
                    {},
                    { isDoorLocked: payload === 'Enabled' },
                    { upsert: true }
                );
                console.log(`État de sécurité mis à jour: ${payload}`);
            }
  
            // Trouver toutes les rooms avec le composant
            const rooms = await Room.find({
                'components.name': componentName
            });
            
            console.log(`Nombre de pièces trouvées avec le composant ${componentName}: ${rooms.length}`);
            
            // Log tous les composants de chaque pièce pour vérification
            rooms.forEach(room => {
                console.log(`\nPièce: ${room.roomName}`);
                console.log('Composants:', room.components.map(c => c.name));
            });
            
            // Mise à jour des composants avec logique conditionnelle
            for (const room of rooms) {
                let updateData = {
                    'components.$.unit': payload
                };
                
                // Logique spécifique pour Bar Lamp
                if (componentName === 'Bar Lamp') {
                    updateData['components.$.isOn'] = payload === 'ON';
                }
                
                // Logique spécifique pour Port
                if (componentName === 'Port') {
                    updateData['components.$.isOn'] = payload === 'Ouverte';
                }
  
                // Logique spécifique pour Security
                if (componentName === 'security') {
                    updateData['components.$.isOn'] = payload === 'Enable';
                }
  
                const updateResult = await Room.updateOne(
                    {
                        _id: room._id,
                        'components.name': componentName
                    },
                    {
                        $set: updateData
                    }
                );
                
                console.log(`Résultat de la mise à jour pour ${room.roomName}:`, updateResult);
            }
        } else {
            console.log(`Aucun composant trouvé pour le topic: ${topic}`);
        }
        
    } catch (err) {
        console.error('Erreur lors de la mise à jour:', err);
    }
    console.log('--- Fin de mise à jour ---\n');
  }





// Gestion des messages reçus depuis Mosquitto
mosquittoClient.on('message', (topic, message) => {
    updateStatus(topic, message.toString());
});

// Gestion des messages reçus depuis HiveMQ
hivemqClient.on('message', (topic, message) => {
    updateStatus(topic, message.toString());
});


app.use('/api/rooms', roomRoutes);
app.use('/api/security', Security);



// Route pour récupérer les derniers payloads par topic
app.get('/get-latest-payloads', async (req, res) => {
    try {
        const latestPayloads = await Payload.aggregate([
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: "$topic",
                    payload: { $first: "$payload" },
                    testPayload: { $first: "$testPayload" },
                    timestamp: { $first: "$timestamp" }
                }
            }
        ]);

        res.status(200).json(latestPayloads);
    } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

// Add the catch-all route HERE, before app.listen
app.use('*', (req, res) => {
    console.log(`Received request for: ${req.originalUrl}`);
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
