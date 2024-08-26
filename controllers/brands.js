const Company = require('../models/company');
const Brand = require('../models/brand');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const brands = await Brand.find({});
    res.render('brands/index', { brands });
}

module.exports.renderNewForm = async (req, res) => {
    const companies = await Company.find({})
    res.render('brands/new', { companies });
}

module.exports.createBrand = async (req, res, next) => {
    const brand = new Brand(req.body.brand);
    brand.img = { url: req.file.path, filename: req.file.filename };
    const companyId = req.body.brand.company;
    const company = await Company.findById(companyId);
    company.brands.push(brand);
    await brand.save();
    await company.save();
    req.flash('success', `Successfully added ${brand.name} to the database.`);
    res.redirect(`/brands/${brand._id}`);
}

module.exports.showBrand = async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        req.flash('error', 'Brand not found!');
        return res.redirect('/brands')
    }
    res.render('brands/show', { brand })
}

module.exports.renderEditForm = async (req, res) => {
    const companies = await Company.find({});
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        req.flash('error', 'Brand not found!');
        return res.redirect('/brands')
    }
    res.render('brands/edit', { brand, companies });
}

module.exports.updateBrand = async (req, res) => {
    const { id } = req.params
    const brand = await Brand.findByIdAndUpdate(id, { ...req.body.brand });
    const selectedCompany = await Company.findById(req.body.brand.company);
    await Company.findByIdAndUpdate(brand.company._id, { $pull: { brands: req.params.id } });
    if (!selectedCompany.brands.includes(brand._id)) {
        selectedCompany.brands.push(brand);
    }
    brand.company = selectedCompany;
    if(req.file) {
        await cloudinary.uploader.destroy(brand.img.filename);
        brand.img = { url: req.file.path, filename: req.file.filename };
    }
    await brand.save();
    if (!brand) {
        req.flash('error', 'Brand not found!');
        return res.redirect('/brands')
    }
    await selectedCompany.save();
    await brand.save();
    req.flash('success', `Successfully updated ${brand.name}`);
    res.redirect(`/brands/${brand._id}`);
}

module.exports.deleteBrand = async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    const company = await Company.findByIdAndUpdate(brand.company._id, { $pull: { brands: id } });
    if (!brand) {
        req.flash('error', 'Brand not found!');
        return res.redirect('/brands')
    }
    req.flash('success', `Successfully deleted ${brand.name}`);
    await Brand.findByIdAndDelete(id);
    res.redirect('/brands')
}