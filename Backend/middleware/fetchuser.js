const jwt = require('jsonwebtoken');

const JWT_SECRETS = process.env.JWT_SECRET || 'your-secret-key-here'; // Use environment variable or default key

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRETS);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
};

module.exports = fetchuser;
