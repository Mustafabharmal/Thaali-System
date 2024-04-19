const jwt = require("jsonwebtoken");
const db = require("../config/db");
const secretKey = "trial";
const { ObjectId } = require("mongodb");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }
    // console.log(authHeader)


    // console.log(req.userId)
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
    // console.log(err)

            return res.status(403).json({ error: "Bhai Logging kar" });
        }
        // console.log(decoded)
        req.userId = decoded.id;
        await db.connect();
        const collection = db.db("ThaliSystem").collection("users");
        const user = await collection.findOne({
            _id: new ObjectId(req.userId),
        });
        req.isAdmin = false;
        req.isManager = false;
        req.isUser = false;
        // console.log(user)
        req.communityid = user.communityid;
        if (user.role == 0 || user.role == "0") {
            req.isAdmin = true;
            // req.isManager = true;
            // return res.status(403).json({ error: 'Unauthorized' });
        } else if (user.role == 1 || user.role == "1") {
            req.isManager = true;
        } else if (user.role == 2 || user.role == "2") {
            req.isUser = true;
        }

        // console.log( decoded.id)
        next();
    });
}

module.exports = { authenticateToken };
