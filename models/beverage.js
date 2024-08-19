const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beverageSchema = new Schema({
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    flavor: {
        type: String,
        required: true
    },
    variety: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    img: {
        url: String,
        filename: String
    }
})

// beverageSchema.post('findOneAndDelete', async function (brand) {
//     if (brand.products.length) {
//     }
//     console.log(brand);
// })

module.exports = mongoose.model('Beverage', beverageSchema)
// Coca Cola Wild Cherry Zero 10pk