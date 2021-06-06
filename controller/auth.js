const User = require('../models/user');
const Portfolio = require('../models/portfolio');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const { password } = require('../config')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mansiqwerty01@gmail.com',
        pass: password
    }
});


module.exports.postregister = async (req, res) => {
    var { firstname, lastname, email, password } = req.body
    if (!email || !password || !firstname || !lastname) {
        return res.status(422).json({ error: "Enter all the details" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" })
            }
            bcrypt.hash(password, 15)
                .then((hashedpw) => {
                    const user = new User({
                        firstname,
                        lastname,
                        email,
                        password: hashedpw,
                    })
                    user.save()
                        .then((user) => {

                            let mailDetails = {
                                from: 'mansiqwerty01@gmail.com',
                                to: user.email,
                                subject: 'Signup Successful',
                                text: 'I hope you have wonderful experience on this platform',
                                html: "<h1>Congratulations on signup<h1>"
                            };
                            mailTransporter.sendMail(mailDetails, function (err, data) {
                                if (err) {
                                    console.log('Error Occurs');
                                } else {
                                    console.log('Email sent successfully');
                                }
                            });
                            return res.status(200).json({ message: "User created Succesfully" })

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    const portfolio = new Portfolio({
                        userid: user._id
                    })
                    portfolio.save()
                })
                .catch((err) => {
                    console.log(err)
                })
        })
}


module.exports.postlogin = async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please provide email or password" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "User doesnot exist with that email" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(match => {
                    if (!match) {
                        return res.status(400).json({ error: "Invalid email or passowrd" })

                    }
                    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET)
                    const firstname = savedUser.firstname
                    const lastname = savedUser.lastname
                    return res.status(200).json({ token, firstname, lastname, message: "Loggen In Succesfully" })

                })

        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports.resetpassword = async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    const token = Math.random().toString(36).slice(-8);
    user.resettoken = token;
    user.expiretoken = Date.now() + 3600000
    const saveduser = await user.save()
    let mailDetails =
    {
        from: 'mansiqwerty01@gmail.com',
        to: saveduser.email,
        subject: 'Reset Password',
        text: 'Here is the link to reset your password',
        html: `<h4>Click on this <a href="http://localhost:3000/newpassword/${token}">link</a> to reset password .</h4>`
    }

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
            return res.status(500).json({ message: "internal error" })
        } else {
            console.log('Email sent successfully');
            return res.status(200).json({ message: "Email sent successfully" })
        }
    })
}

module.exports.newpassword = async (req, res) => {
    const newpassword = req.body.password
    const token = req.params.token;
    const user = await User.findOne({ resettoken: token, expiretoken: { $gt: Date.now() } })
    if (user) {
        const hpw = await bcrypt.hash(newpassword, 15)
        user.password = hpw;
        user.resettoken = ''
        user.expiretoken = ''
        await user.save()
        return res.status(200).json({ message: "Password Updated Successfully" })
    }
    else {
        res.json({ err: "Session expired" }).status(422)
    }
}
