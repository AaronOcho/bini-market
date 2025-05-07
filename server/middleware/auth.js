const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const { email, password } = req.headers;
    
    if (email === 'coletbini2025@gmail.com' && password === 'coletbini2025') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    adminAuth
};