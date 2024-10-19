const express = require("express");
const { createCategory, getCategories, deleteCategories, updateCategories } = require("../../controllers/categories/category");
const isLoggin = require("../../middlewares/isLoggin");

const categoryRouter = express.Router();

// létrehozás

categoryRouter.post('/', isLoggin, createCategory);
// lekérdezés
categoryRouter.get('/', getCategories);
// törlés
categoryRouter.delete('/:id', isLoggin, deleteCategories);
// frissítés
categoryRouter.put('/:id', isLoggin, updateCategories);

module.exports = categoryRouter;