const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, "Le titre de la recette est requis"]
    },
    ingredients: {
        type: [String],
    },
    instructions: {
        type: [String],
    },
    tpsPrepa: {
        type: Number,
        required: [true, "Le temps de prépa de la recette est requis"]
    },
    tpsCuisson: {
        type: Number,
        required: [true, "Le temps de cuisson de la recette est requis"]
    },
    difficulte: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile']
    },
    categorie: {
        type: String,
        enum: ['Entrée', 'Plat principal', 'Dessert']
    }
});
const recetteModel = mongoose.model("recettes", recetteSchema);
module.exports = recetteModel;