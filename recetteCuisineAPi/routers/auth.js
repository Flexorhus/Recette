const jwt = require('jsonwebtoken');

const JWT_SECRET = "Secret"

function authenticateToken(req, res, next) {

    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token);
        if (!token)
            return res.status(403).json({ message: "Token manquant" });
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.userId = decodedToken.userId
        next();
    } catch (error) {
        res.json({ message: "Token invalide " })
    }
}

module.exports = authenticateToken