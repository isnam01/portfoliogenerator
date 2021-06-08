if (process.env.NODE_ENV === "production") {
    module.exports.mongourl = process.env.mongourl,
        module.exports.JWT_SECRET = process.env.JWT_SECRET,
        module.exports.password = process.env.password

}
else {

    module.exports.mongourl = 'mongodb+srv://mansi:mansi@confusion.tueyj.mongodb.net/portfolio?retryWrites=true&w=majority'
    module.exports.password = 'mansiqwerty@gmail.com'
    module.exports.JWT_SECRET = '123456'
}

