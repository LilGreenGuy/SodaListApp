const Company = require('../models/company');

module.exports.index = async (req, res) => {
    const companies = await Company.find({});
    res.render('companies/index', { companies });
}

module.exports.renderNewForm = (req, res) => {
    res.render('companies/new');
}

module.exports.createCompany = async (req, res, next) => {
    const company = new Company(req.body.company);
    company.img = { url: req.file.path, filename: req.file.filename };
    await company.save();
    req.flash('success', `Successfully added ${company.name} to the database.`);
    res.redirect(`/companies/${company._id}`);
}

module.exports.showCompany = async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id).populate('brands');
    if (!company) {
        req.flash('error', 'Company not found!');
        return res.redirect('/companies')
    }
    res.render('companies/show', { company });
}

module.exports.renderEditForm = async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        req.flash('error', 'Company not found!');
        return res.redirect('/companies')
    }
    res.render('companies/edit', { company });
}

module.exports.updateCompany = async (req, res) => {
    const { id } = req.params
    const company = await Company.findByIdAndUpdate(id, { ...req.body.company });
    if (!company) {
        req.flash('error', 'Company not found!');
        return res.redirect('/companies')
    }
    req.flash('success', `Successfully updated ${company.name}`);
    res.redirect(`/companies/${company._id}`);
}

module.exports.deleteCompany = async (req, res, next) => {
    const { id } = req.params;
    const company = await Company.findById(id);
    req.flash('success', `Successfully deleted ${company.name}`);
    await Company.findByIdAndDelete(id);
    res.redirect('/companies');
}