const { JsonWebTokenError } = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) return res.status(403);

    JsonWebTokenError.verify(token, "secret_key", (err, user) => {
        if(err)
            return res.status(404);
        
        req.user = user;
        next();
    });
}

module.exports = verifyToken;