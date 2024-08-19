const mongoose = require('mongoose');
const Brand = require('./brand');
const Beverage = require('./beverage');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    brands:
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'Brand'
            }
        ],
    img: {
        url: String,
        filename: String
    }
})

companySchema.post('findOneAndDelete', async function (company) {
    if (company.brands.length) {
        for(let i = 0; i < company.brands.length; i++) {
            const brand = await Brand.findById(company.brands[i])
            if (brand.products.length) {    
                const res = await Beverage.deleteMany({ _id: { $in: brand.products } })
                console.log(res);
            }
        }
        const res = await Brand.deleteMany({ _id: { $in: company.brands } })
    }
})

module.exports = mongoose.model('Company', companySchema);