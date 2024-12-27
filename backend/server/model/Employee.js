const mongoose = require('mongoose');

// Définir un schéma avec tous les champs nécessaires
const EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: { type: String, unique: true },
    password: String,
});

// Création du modèle
const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;