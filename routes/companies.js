const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const companies = require('../controllers/companies');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const { validateCompany, isLoggedIn } = require('../middleware')

router.route('/')
    .get(catchAsync(companies.index))
    .post(isLoggedIn, upload.single('image'), validateCompany, catchAsync(companies.createCompany));

router.get('/new', isLoggedIn, companies.renderNewForm)

router.route('/:id')
    .get(catchAsync(companies.showCompany))
    .put(isLoggedIn,  validateCompany, catchAsync(companies.updateCompany))
    .delete(isLoggedIn, catchAsync(companies.deleteCompany));

router.get('/:id/edit', isLoggedIn, catchAsync(companies.renderEditForm));

module.exports = router;