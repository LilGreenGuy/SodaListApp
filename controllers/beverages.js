const Brand = require('../models/brand');
const Beverage = require('../models/beverage');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const beverages = await Beverage.find({}).populate('brand');
    res.render('beverages/index', { beverages });
}

module.exports.renderNewForm = async (req, res) => {
    const brands = await Brand.find({});
    res.render('beverages/new', { brands })
}

module.exports.createBeverage = async (req, res) => {
    const beverage = new Beverage(req.body.beverage);
    beverage.img = { url: req.file.path, filename: req.file.filename };
    const brandId = req.body.beverage.brand;
    const brand = await Brand.findById(brandId);
    brand.products.push(beverage);
    await beverage.save();
    await brand.save();
    req.flash('success', `Successfully added ${brand.name} ${beverage.flavor} ${beverage.variety} ${beverage.size} to the database.`);
    res.redirect(`/brands/${brand._id}`);
}

module.exports.showBeverage = async (req, res) => {
    const { id } = req.params;
    const beverage = await Beverage.findById(id).populate('brand');
    if (!beverage) {
        req.flash('error', 'Beverage not found!');
        return res.redirect('/beverages')
    }
    res.render('beverages/show', { beverage })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const brands = await Brand.find({});
    const beverage = await Beverage.findById(id);
    if (!beverage) {
        req.flash('error', 'Beverage not found!');
        return res.redirect('/beverages')
    }
    res.render('beverages/edit', { beverage, brands });
}

module.exports.updateBeverage = async (req, res) => {
    const { id } = req.params;
    const beverage = await Beverage.findByIdAndUpdate(id, { ...req.body.beverage });
    const brand = await Brand.findById(req.body.beverage.brand);
    beverage.brand = brand;
    if (!brand.products.includes(beverage._id)) {
        brand.products.push(beverage);
        await brand.save();
    }
    if(req.file) {
        await cloudinary.uploader.destroy(beverage.img.filename);
        beverage.img = { url: req.file.path, filename: req.file.filename };
    }
    if (!beverage) {
        req.flash('error', 'Beverage not found!');
        return res.redirect('/beverages')
    }
    await beverage.save();
    req.flash('success', `Successfully updated ${brand.name} ${beverage.flavor} ${beverage.variety} ${beverage.size}`);
    res.redirect(`/brands/${brand._id}`);
}

module.exports.deleteBeverage = async (req, res) => {
    const { id} = req.params;
    const beverage = await Beverage.findById(id);
    const brand = await Brand.findByIdAndUpdate(beverage.brand, { $pull: { products: id } });
    req.flash('success', `Successfully deleted ${brand.name} ${beverage.flavor} ${beverage.variety} ${beverage.size}`);
    await Beverage.findByIdAndDelete(id);
    res.redirect('/beverages');

}