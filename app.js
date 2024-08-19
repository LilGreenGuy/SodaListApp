if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override'); 
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');

const Company = require('./models/company');
const Brand = require('./models/brand');
const Beverage = require('./models/beverage');
const User = require('./models/user');

const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/companies');
const brandRoutes = require('./routes/brands');
const beverageRoutes = require('./routes/beverages');

mongoose.connect('mongodb://127.0.0.1:27017/soda-list');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbebetter',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 604800000
    }
}

app.use(session(sessionConfig));
app.use(flash());

// PASSPORT

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//FLASH

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// ROUTES

app.get('/', catchAsync(async(req, res) => {
    const companies = await Company.find({});
    const brands = await Brand.find({});
    const beverages = await Beverage.find({});
    res.render('main/index', {companies, brands, beverages});
}));

app.use('/', authRoutes);
app.use('/companies', companyRoutes);
app.use('/brands', brandRoutes);
app.use('/beverages', beverageRoutes);


//error handling

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});