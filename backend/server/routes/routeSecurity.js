const express = require('express');
const router = express.Router();
const Security = require('../models/security');

// Endpoint pour récupérer l'état de sécurité
router.get('/', async (req, res) => {
  try {
    const securityStatus = await Security.findOne();

    if (!securityStatus) {
      return res.status(404).json({ message: "Aucun état de sécurité trouvé." });
    }

    res.status(200).json(securityStatus);
  } catch (err) {
    console.error("Erreur lors de la récupération de l'état de sécurité :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Endpoint pour mettre à jour l'état de sécurité
router.put('/', async (req, res) => {
  const { isDoorLocked } = req.body;

  try {
    // Vérifiez que le champ estDoorLocked est présent
    if (isDoorLocked === undefined) {
      return res.status(400).json({ error: "Le champ 'isDoorLocked' est requis." });
    }

    // Chercher le statut existant ou créer un nouveau
    let securityStatus = await Security.findOne();

    if (!securityStatus) {
      securityStatus = new Security({ isDoorLocked });
    } else {
      // Mettre à jour la valeur existante
      securityStatus.isDoorLocked = isDoorLocked;
    }

    // Enregistrer dans la base de données
    const updatedStatus = await securityStatus.save();

    res.status(200).json(updatedStatus);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'état de sécurité :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
