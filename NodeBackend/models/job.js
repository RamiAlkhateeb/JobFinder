// App / Models / Jobs
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    
    company_name: { type: String, required: true },
    job_title: { type: String, required: true },
    job_description: { type: String, required: true },
    salary: { type: Number },
    location: { type: String},
    company_id: { type: String, required: true },


},
    { timestamps: true }
);
module.exports = mongoose.model('Job', JobSchema);