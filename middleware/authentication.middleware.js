require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = {
    authentication: async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (token) {
                jwt.verify(token, process.env.secret_key, async (err, decode) => {
                    if (decode) {
                        user = decode["user-id"];
                        next()
                    } else {
                        res.status(500).send({
                            status: false,
                            msg: "Invalid token.."
                        })
                    }
                })
            } else {
                res.status(401).send({
                    status: false,
                    msg: "You need to Login.."
                })
            }
        } catch {
            res.status(500).send({
                status: false,
                msg: "Error occurred during Authentication."
            })
        }
    }
}