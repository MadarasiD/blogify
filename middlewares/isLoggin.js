const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

const isLoggin = (req, res, next) => {
    console.log(req.headers);

    // token lekérése
    const token = req.headers.authorization?.split(" ")[1];

    // token ellenőrzése
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {

        const userId = decoded?.user?.id; // 'id' kell, nem 'userId'
        

        const user = await User.findById(userId).select("username email role _id");

        req.userAuth = user;

        if (err) {
            const err = new Error("A token lejárt/érvénytelen");

            next(err);
        } else {

            next(); // Csak akkor megy tovább, ha a token érvényes
        }
    });
}

module.exports = isLoggin;
