const User = require('../models/user');
const Portfolio = require('../models/portfolio');

module.exports.editportfolio = async (req, res) => {
    var id = req.user
    const portfolio = await Portfolio.findOne({ userid: id })
    if (!portfolio) {
        return res.status(500).json({ message: "Cant find portfolio" })
    }
    portfolio.sections = req.body.sections
    portfolio.resume = req.body.resume
    portfolio.skills = req.body.skills
    portfolio.contact = req.body.contact
    await portfolio.save()
    return res.status(200).json({ portfolio, message: "Updated Successfully" })
}

module.exports.getportfolio = async (req, res) => {
    var id = req.user
    const portfolio = await Portfolio.findOne({ userid: id })
    if (!portfolio) {
        return res.status(500).json({ message: "Cant find portfolio" })
    }
    else {
        return res.status(200).json({ portfolio })
    }
}

module.exports.allportfolio = async (req, res) => {
    const portfolios = await Portfolio.find({})
    return res.status(200).json({ portfolios })
}

module.exports.updateurl = async (req, res) => {
    const urls = await Portfolio.find({}, { url: 1, _id: 0 })
    if (urls.includes(req.body.url)) {
        return res.status(422).json({ message: "This url is already taken" })
    }
    else {
        return res.status(200).json({ message: "Updated your url" })
    }
}