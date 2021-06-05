const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PortfolioSchema = new Schema({

    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sections: {
        about: {
            type: Boolean,
            default: false
        },
        skills: {
            type: Boolean,
            default: false
        },
        resume: {
            type: Boolean,
            default: false
        },
        projects: {
            type: Boolean,
            default: false
        },
        services: {
            type: Boolean,
            default: false
        },
        contact: {
            type: Boolean,
            default: false
        }
    },

    url: {
        type: String
    },
    about: {
        profile: String,
        dob: Date,
        city: String,
        phone: Number,
        email: String,
        degree: String,
        freelance: String,
        aboutSummary: String
    },
    skills: [{
        skillname: String,
        skillExpertise: Number
    }],
    resume: {
        education: [{
            courseName: String,
            courseStart: String,
            courseEnd: String,
            institute: String,
            detail: String
        }],
        experience: [{
            profile: String,
            start: Date,
            end: Date,
            organisation: String,
            detail: String
        }],
        projects: [{
            title: String,
            description: String,
            link: String
        }],
        services: [{
            title: String,
            description: String
        }]
    },
    contact: {
        email: String,
        phone: Number,
        location: String,
        socialMedia: {
            twitter: String,
            facebook: String,
            instagram: String,
            github: String,
            linkedin: String
        }
    }
})

module.exports = mongoose.model('Portfolio', PortfolioSchema);