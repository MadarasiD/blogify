const jwt = require('jsonwebtoken');

const generateToken = (user) =>{
    // payload létrehozása a felhasználónak

    const payload = {
        user: {
            id: user.id
        },
    };

    // bejelentkezés a tokennel és a titkos kulccsal
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: 36000 // 1 óra
    });

    return token;

};

module.exports = generateToken;

