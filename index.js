const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { mongourl, JWT_SECRET } = require('./config')
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio')
const userRoutes = require('./routes/user')

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.on("open", () => {
    console.log("Database Connected")
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "POST, PUT, GET, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});
app.use(express.json());

app.use('/', authRoutes);
app.use('/', portfolioRoutes);
app.use('/', userRoutes);

app.listen(3000, () =>
    console.log("Serving on port 3000")
)