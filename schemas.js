const Joi = require('joi');

module.exports.companySchema = Joi.object({
    company: Joi.object({
        name: Joi.string().required(),
    }).required()
})

module.exports.brandSchema = Joi.object({
    brand: Joi.object({
        company: Joi.string(),
        name: Joi.string().required(),
    }).required()
})

module.exports.beverageSchema = Joi.object({
    beverage: Joi.object({
        brand: Joi.string().required(),
        flavor: Joi.string().required(),
        variety: Joi.string().required(),
        size: Joi.string().required(),
    }).required()
})