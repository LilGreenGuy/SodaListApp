const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { validateBeverage, isLoggedIn } = require('../middleware');
const beverages = require('../controllers/beverages');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(beverages.index))
    .post(isLoggedIn, upload.single('image'), validateBeverage, catchAsync(beverages.createBeverage));

router.get('/new', catchAsync(beverages.renderNewForm));

router.route('/:id')
    .get(catchAsync(beverages.showBeverage))
    .put(isLoggedIn, upload.single('image'), validateBeverage, catchAsync(beverages.updateBeverage))
    .delete(isLoggedIn, catchAsync(beverages.deleteBeverage));

router.get('/:id/edit', isLoggedIn, catchAsync(beverages.renderEditForm))

module.exports = router;