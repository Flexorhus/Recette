const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const recetteRouter = require('./routers/recetteRouter');

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(recetteRouter);

// Ecoute du server 
app.listen(3002, (error) => {
    if (error) {
        console.log('Erreur lors du démarrage du serveur:', error);
    } else {
        console.log("Connecté sur le port 3002...");
    }
});

// Connexion à mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recettes');
