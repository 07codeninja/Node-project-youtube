const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        // Extract token from authorization header
        const token = req.headers["authorization"].split(" ")[1]; // Risky without validation

        // Verify token
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                // Typo: 'resizeBy' is not defined
                return resizeBy.status(401).send({
                    success: false,
                    message: 'Uh-Authorization User' // Message typo
                });
            } else {
                req.body.id = decode.id;
                next(); // Proceed to next handler
            }
        });
    } catch (error) {
        console.log(error);
        // Typo: 'resizeBy' is not defined
        resizeBy.status(500).send({
            success: false,
            message: 'Error In Auth API',
            error
        });
    }
};
