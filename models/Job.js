const mongoose = require("mongoose");

const Jobschema = mongoose.Schema({
    language : {
        type: String,
        required : true,
        enum:["cpp", "py"]
    },
    filePath:{
        type: String,
        required: true
    },
    code:{
        type: String
    },
    // submittedAt: {
    //     type: Date,
    //     default: Date.now 
    // },
    // startedAt: {
    //     type: Date
    // },
    // completedAt: {
    //     type: Date
    // },
    output: {
        type: String
    },
    // status:{
    //     type: String,
    //     default: "pending",
    //     enum:["pending","success","error"]
    // }
});

const Job = mongoose.model('job', Jobschema); 

module.exports = Job;
