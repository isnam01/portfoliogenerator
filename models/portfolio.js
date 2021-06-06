const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PortfolioSchema = new Schema({

    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sections: {
        About: {
            type: Boolean,
            default: false
        },
        Skills: {
            type: Boolean,
            default: false
        },
        Resume: {
            type: Boolean,
            default: false
        },
        Projects: {
            type: Boolean,
            default: false
        },
        Services: {
            type: Boolean,
            default: false
        },
        Contact: {
            type: Boolean,
            default: false
        }
    },

    url: {
        type: String,
        default: ""
    },
    About: {
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
    Skills: [{
        skillName: {
            type: String,
            default: ""
        },
        skillExpertise: {
            type: String,
            default: ""
        }
    }],
    Resume: {
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
    Projects: [{
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
    Services: [{
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    }],
    Contact: {
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
}, { versionKey: false })

module.exports = mongoose.model('Portfolio', PortfolioSchema);