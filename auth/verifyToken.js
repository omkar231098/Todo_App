
const jwt = require("jsonwebtoken");


const authenticate = async (req, res, next) => {
    // Get JWT from 'Authorization' header
    const authToken = req.headers.authorization;

    // Check for valid 'Bearer ' token in header
    if (!authToken || !authToken.startsWith("Bearer ")) {
        // Unauthorized if no or improperly formatted token
        return res.status(401).json({ success: false, message: "No token, authorization failed" });
    }

    try {
        // Extract token from 'Bearer ' prefix
        const token = authToken.split(" ")[1];

        // Verify JWT using provided secret key
        const decoded = jwt.verify(token, process.env.NormalToken);

        // Attach user ID to request object
        req.userId = decoded.id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle different JWT verification errors

        // If the token has expired
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token is expired" });
        }

        // If the token is invalid for other reasons
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};


module.exports = { authenticate };
