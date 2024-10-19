const asyncHandler = require('express-async-handler');
const Category = require('../../model/Category/Category');

//@desc Kategóriák készítése
//@route POST /api/v1/categories
//@access Private

exports.createCategory = asyncHandler(async (req, res) => {
    const { name, author } = req.body;
    //! Ha a kategória már létezik
    const categoryFound = await Category.findOne({ name });
    if (categoryFound) {
        throw new Error('A kategória már létezik')
    }
    const category = await Category.create({
        name: name,
        author: req.userAuth?._id
    });
    res.status(201).json({
        status: 'success',
        message: 'A kategória sikeresen létrehozva',
        category,
    });
});

//@desc Kategóriák lekérdezése
//@route GET /api/v1/categories
//@access Public

exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});

    res.status(201).json({
        status: 'success',
        message: 'A kategóriák sikeresen lekérdezve',
        categories,
    });
});

//@desc Kategóriák törlése
//@route Delete /api/v1/categories/:id
//@access Private

exports.deleteCategories = asyncHandler(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: 'success',
        message: 'A kategória sikeresen törölve',
    });
});

//@desc Kategóriák frissítése
//@route Update /api/v1/categories/:id
//@access Private

exports.updateCategories = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(201).json({
        status: 'success',
        message: 'A kategória sikeresen frissítve',
        category,
    });
});