const mongoose = require('mongoose');
const Company = require('../models/company')

mongoose.connect('mongodb://127.0.0.1:27017/soda-list');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sodaDB = async () => {
    // await Company.deleteMany({});
    const company = new Company({
        name: "Pepsi Co",
        img: "/img/pepsico-logo.jpg"
    })
    await company.save();

}

sodaDB().then(() => {
    mongoose.connection.close()
})