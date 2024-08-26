const mongoose = require('mongoose');
const Beverage = require('./beverage');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})


const brandSchema = new Schema({
    company:
    {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    name: {
        type: String,
        required: [true, 'Brand must have a name!']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Beverage'
        }
    ],
    img: [ImageSchema],
    defaultProductImage: [ImageSchema]
})

brandSchema.post('findOneAndDelete', async function (brand) {
    if (brand.products.length) {
        const res = await Beverage.deleteMany({ _id: { $in: brand.products } })
        console.log(res);
    }
})


module.exports = mongoose.model('Brand', brandSchema)