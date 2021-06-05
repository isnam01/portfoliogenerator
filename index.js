const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { mongourl, JWT_SECRET } = require('./config')
const authRoutes = require('./routes/auth');
const { authenticateLogin } = require('./middleware/authenticateLogin');
const portfolioRoutes = require('./routes/portfolio')

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

app.use(express.json());

app.use('/', authRoutes);
app.use('/', portfolioRoutes);

app.listen(3000, () =>
    console.log("Serving on port 3000")
)