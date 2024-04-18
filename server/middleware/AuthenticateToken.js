const jwt = require('jsonwebtoken');

const secretKey = 'trial';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }
    // console.log(req.userId)
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        // console.log(decoded)
        req.userId = decoded.id;
        // console.log( decoded.id)
        next();
    });
}

module.exports = {authenticateToken};
