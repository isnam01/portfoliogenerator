const User = require('../models/user');
const Portfolio = require('../models/portfolio');

module.exports.updateuser = async (req, res) => {
    var id = req.user
    const { firstname, lastname, email } = req.body
    User.findOneAndUpdate({ _id: id }, { $set: { firstname, lastname, email } })
        .then(() => {
            return res.status(200).json({ message: "Update Successfully" })
        }).catch((err) => {
            console.log(err)
        })
}

module.exports.deleteuser = async (req, res) => {
    var id = req.user
    User.findOneAndDelete({ _id: id })
        .then(() => {
            return res.status(200).json({ message: "Deleted Successfully" })
        }).catch((err) => {
            console.log(err)
        })
}


