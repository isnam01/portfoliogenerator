if (process.env.NODE_ENV === "production") {
    module.exports = {
        MONGOURI: process.env.MONGOURI,
        JWT_SECRET: process.env.JWT_SECRET,
        SEND_API: process.env.SEND_API
    }
}
else {

    module.exports.mongourl = 'mongodb+srv://mansi:mansi@confusion.tueyj.mongodb.net/portfolio?retryWrites=true&w=majority'
    module.exports.password = 'mansiqwerty@gmail.com'
    module.exports.JWT_SECRET = '123456'
}

