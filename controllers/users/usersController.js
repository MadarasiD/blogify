const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require("../../model/User/User");
const generateToken = require('../../utils/generateToken');

//@desc Új felhasználó regisztrálása
//@route POST /api/v1/users/register
//@access public



exports.register = asyncHandler(async (req, res) => {

        // adatok beszerzése
        const {username, password, email } = req.body;

        //! ellenőrizze, hogy létezik-e felhasználó
        const user = await User.findOne({username})
        if (user) {
            throw new Error('A felhasználó már létezik')
        }
        
        // Új felhasználó regisztrálása
        const newUser = new User({
            username,
            email,
            password,
        });

        //! hash jelszó

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // adatok mentése DB-be
        await newUser.save();
        res.status(201).json({
            status: 'success',
            message: 'Sikeres regisztráció',
            _id: newUser?._id,
            username: newUser?.username,
            email: newUser?.email,
            role: newUser?.role,
            newUser,
        });
});

//@desc felhasználó bejelentkezése
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler(async(req, res)=>{
        //? megkapja a bejelentkezési adatokat
        const {username, password} = req.body;

        //! ellenőrizze, hogy létezik-e
        const user = await User.findOne({username});
        if (!user){
            throw new Error('érvénytelen bejelentkezési adatok');
        }
        //hasonlítsa össze a kivonatolt jelszót a kért jelszóval
        const isMatched = await bcrypt.compare(password, user?.password );
        if(!isMatched) {
            throw new Error('érvénytelen bejelentkezési adatok');
        }
        //Utolsó bejelentkezés frissítése
        user.lastLogin = new Date();
        res.json({
            status: 'success',
            email: user?.email,
            _id: user?._id,
            username: user?.username,
            role: user?.role,
            token: generateToken(user),
        })
});

//@desc profil lekérése
//@route POST /api/v1/users/profile/:id
//@access private

exports.getProfile = asyncHandler(async(req, res, next) => {

        // használjuk a felhasználó azonosítót a paraméterekből
        const id = req.userAuth._id;
        const user = await User.findById(id);

        res.json({
            status: 'success',
            message: 'Profil lekérve',
            user,
        });
});