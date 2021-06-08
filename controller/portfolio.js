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
    const pf = await Portfolio.findOne({ url: url }).select('-_id')
    if (!pf) {
        return res.status(404).json({ message: "This is not a valid url" })
    }
    const userid = pf.userid
    const user = await User.findOne({ _id: userid }).select('firstname').select('lastname').select('-_id')
    var portfolio = JSON.parse(JSON.stringify(pf));
    delete portfolio.userid
    return res.status(200).json({ portfolio, user })
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
        await Portfolio.findOneAndUpdate({ userid: req.user }, { $set: { url: req.body.url } })

        return res.status(200).json({ message: "Updated your url" })
    }
}

module.exports.geturl = async (req, res) => {
    const url = await Portfolio.findOne({ userid: req.user }).select('url').select('-_id')
    return res.status(200).json(url)
}

module.exports.contact = async (req, res) => {
    const url = req.params.url
    const ct = await Portfolio.findOne({ url: url }).select('-_id').select('Contact').select('userid').select('About')
    const profile = ct.About.profile
    if (!ct) {
        return res.status(404).json({ message: "This is not a valid url" })
    }
    const userid = ct.userid
    const user1 = await User.findOne({ _id: userid }).select('firstname').select('lastname').select('-_id')
    var cp = JSON.parse(JSON.stringify(ct));
    delete cp.userid
    const contact = cp.Contact
    let user = JSON.parse(JSON.stringify(user1))
    user.profile = profile
    return res.status(200).json({ contact, user })
}