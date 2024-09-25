const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Secret"

// Post un user
userRouter.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // hashage du mot de passe 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur avec le mot de passe hashé
        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.json(error);
    }
})
// Connexion d'un utilisateur
userRouter.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ token: token, message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion', details: error });
    }
});

// Déconnexion de l'utilisateur
userRouter.post('/users/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        }
        res.json({ message: 'Déconnexion réussie' });
    });
});

// Récupération de tous les utilisateurs
userRouter.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
})

// : important abstraction pour recup une variable 
userRouter.get('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id })
        res.json(user);
    } catch (error) {
        res.json(error);
    }
})
// : important abstraction pour recup une variable 
userRouter.put('/users/:id', async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        await userModel.updateOne({ _id: req.params.id }, updateData)
        res.json({ message: "l'utilisateur a bien été modifier" })
    } catch (error) {
        res.json(error)

    }
})
userRouter.delete('/users/:id', async (req, res) => {
    try {
        await userModel.deleteOne({ _id: req.params.id });
        res.json({ message: "l'utilisateur a bien été supprimer" });
    } catch (error) {
        res.json(error);
    }
})
module.exports = userRouter
