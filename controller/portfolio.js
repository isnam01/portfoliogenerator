const User = require('../models/user');
const Portfolio = require('../models/portfolio');

module.exports.editportfolio = async (req, res) => {
    var id = req.user
    Portfolio.findOneAndUpdate({ userid: id }, {
        $set: {
            sections: req.body.sections,
            About: req.body.About,
            Services: req.body.Services,
            Projects: req.body.Projects,
            Resume: req.body.Resume,
            Skills: req.body.Skills,
            Contact: req.body.Contact
        }
    })
        .then((portfolio) => {
            if (!portfolio) {
                return res.status(500).json({ message: "Cant find portfolio" })
            }
            return res.status(200).json({ message: "Updated Successfully" })
        })
        .catch((err) => {
            console.log(err)
        })

}

module.exports.getportfolio = async (req, res) => {
    var id = req.user
    Portfolio.findOne({ userid: id })
        .select('-userid')
        .select('-_id')
        .then((portfolio) => {
            if (!portfolio) {
                return res.status(500).json({ message: "Cant find portfolio" })
            }
            else {
                return res.status(200).json(portfolio)
            }
        })
        .catch((err) => {
            console.log(err)
        })

}

module.exports.allportfolio = async (req, res) => {
    const portfolio = await Portfolio.find({ url: req.body.url })
    return res.status(200).json(portfolio)
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