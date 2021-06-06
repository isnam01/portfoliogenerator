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
        type: String,
        default: ""
    },
    about: {
        profile: {
            type: String,
            default: ""
        },
        dob: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        degree: {
            type: String,
            default: ""
        },
        freelance: {
            type: String,
            default: ""
        },
        aboutSummary: {
            type: String,
            default: ""
        }
    },
    skills: [{
        skillname: {
            type: String,
            default: ""
        },
        skillExpertise: {
            type: String,
            default: ""
        }
    }],
    resume: {
        education: [{
            courseName: {
                type: String,
                default: ""
            },
            courseStart: {
                type: String,
                default: ""
            },
            courseEnd: {
                type: String,
                default: ""
            },
            institute: {
                type: String,
                default: ""
            },
            detail: {
                type: String,
                default: ""
            }
        }],
        experience: [{
            profile: {
                type: String,
                default: ""
            },
            start: {
                type: String,
                default: ""
            },
            end: {
                type: String,
                default: ""
            },
            organisation: {
                type: String,
                default: ""
            },
            detail: {
                type: String,
                default: ""
            }
        }],

    },
    projects: [{
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        link: {
            type: String,
            default: ""
        }
    }],
    services: [{
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    }],
    contact: {
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        socialMedia: {
            twitter: {
                type: String,
                default: ""
            },
            facebook: {
                type: String,
                default: ""
            },
            instagram: {
                type: String,
                default: ""
            },
            github: {
                type: String,
                default: ""
            },
            linkedin: {
                type: String,
                default: ""
            }
        }
    }
})

module.exports = mongoose.model('Portfolio', PortfolioSchema);