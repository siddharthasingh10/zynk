
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token; 
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
                success: false
            });        
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token",
                success: false
            });
        }

        req.id = decoded.userId; // ✅ Store user ID in request

        next(); // ✅ Continue to the next middleware or route handler

    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};
