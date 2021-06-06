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
            Contact: req.body.Contact,
            url: req.body.url
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
    const url = req.params.url
    const portfolio = await Portfolio.findOne({ url: url }).select('-userid').select('-_id')
    if (!portfolio) {
        return res.status(404).json({ message: "This is not a valid url" })
    }
    return res.status(200).json(portfolio)
}

module.exports.updateurl = async (req, res) => {
    const urls = await Portfolio.find({}, { url: 1, _id: 0 })
    const arrurl = urls.map((item) => {
        return item.url
    })
    if (arrurl.includes(req.body.url)) {
        return res.status(422).json({ message: "This url is already taken" })
    }
    else {
        return res.status(200).json({ message: "Updated your url" })
    }
}