const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { validateBrand, isLoggedIn } = require('../middleware');
const brands = require('../controllers/brands');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(brands.index))
    .post(isLoggedIn, upload.single('image'), validateBrand, catchAsync(brands.createBrand))

router.get('/new', isLoggedIn, catchAsync(brands.renderNewForm));

router.route('/:id')
    .get(catchAsync(brands.showBrand))
    .put(isLoggedIn, upload.single('image'), validateBrand, catchAsync(brands.updateBrand))
    .delete(isLoggedIn, catchAsync(brands.deleteBrand));

router.get('/:id/edit', isLoggedIn, catchAsync(brands.renderEditForm));

module.exports = router;