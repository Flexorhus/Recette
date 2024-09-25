const recetteModel = require('../models/recetteModel');
const recetteRouter = require('express').Router();

recetteRouter.post('/recettes', async (req, res) => {
    try {
        console.log(req.body);
        const newRecette = new recetteModel(req.body);
        await newRecette.save();
        res.json(newRecette);
    } catch (error) {
        res.json(error);
    }
})
// afficher les recettes 
recetteRouter.get('/recettes', async (req, res) => {
    try {
        const recettes = await recetteModel.find();
        res.json(recettes);
    } catch (error) {
        res.json(error);
    }
})
// Obtenir une recette
// : important abstraction pour recup une variable 
recetteRouter.get('/recettes/:id', async (req, res) => {
    try {
        const recette = await recetteModel.findOne({ _id: req.params.id })
        res.json(recette);
    } catch (error) {
        res.json(error);
    }
})
// : important abstraction pour recup une variable 
recetteRouter.put('/recettes/:id', async (req, res) => {
    try {
        await recetteModel.updateOne({ _id: req.params.id }, req.body)
        res.json({ message: "La recette a bien été modifier" })
    } catch (error) {
        res.json(error)
    }
})
recetteRouter.delete('/recettes/:id', async (req, res) => {
    try {
        await recetteModel.deleteOne({ _id: req.params.id });
        res.json({ message: "La recette a bien été supprimer" });
    } catch (error) {
        res.json(error);
    }
})
module.exports = recetteRouter