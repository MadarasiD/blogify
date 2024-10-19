const express = require('express');
const {register, login, getProfile} = require("../../controllers/users/usersController");
const isLoggin = require('../../middlewares/isLoggin');

const usersRouter = express.Router()


//!Regisztráció
usersRouter.post("/register", register);
//!Bejelentkezés
usersRouter.post("/login", login);
//! profil
usersRouter.get("/profile", isLoggin, getProfile);

// * Exports

module.exports = usersRouter;