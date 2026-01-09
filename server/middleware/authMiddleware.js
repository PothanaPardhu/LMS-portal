const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // 1. Get the full header
    const authHeader = req.header('Authorization'); 
    
    // 2. Check if header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 3. Extract only the token part (remove 'Bearer ')
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verify using your Render environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // This triggers if the secret is wrong or token is expired
        res.status(401).json({ message: "Token is not valid" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = { protect, adminOnly };
