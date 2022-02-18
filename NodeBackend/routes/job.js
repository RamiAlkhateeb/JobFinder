const Job = require("../models/Job");
const User = require("../models/User");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndRecruiter,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
    const newJob = new Job(req.body);

    try {
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndRecruiter, async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndRecruiter, async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json("Job has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Job
router.get("/find/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json(err);
    }
});



//GET Jobs of company
router.get("/postedjobs/:companyid", async (req, res) => {
    try {
        const jobs = await Job.find({
            company_id: {
                $eq:req.params.companyid
            }
        })
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET seekers of company
router.get("/seekers/:companyid", async (req, res) => {
    try {
        // const jobs = await Job.find({
        //     company_id: {
        //         $eq:req.params.companyid
        //     }
        // })
        let companyJobs = await Job.find({
            company_id: {
                $eq:req.params.companyid
            }
        })
        let jobs;
        let seekers = await User.find({
            appliedJobs:{
                $in:companyJobs
            }
        });
        // for (let i in seekers)
        // {
        //     console.log("seeker")
        //     console.log(seekers[i].name)
        //     let jobsOfEmp = seekers[i].appliedJobs
        //     //console.log(jobsOfEmp)
        //     for(let j in companyJobs)
        //     {
        //         console.log("jobs of him")
        //         console.log(jobsOfEmp[j])
        //         let job = await Job.findById(jobsOfEmp[j])
        //         console.log("job")
        //         console.log(job)
        //         if (job.company_id == req.params.companyid)
        //             jobs.push(seekers[i])
        //     }
        // }
        res.status(200).json(seekers);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL Jobs
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qRole = req.query.role;
    const companyName = req.query.company;
    try {
        let jobs;

        if (qNew) {
            jobs = await Job.find().sort({ createdAt: -1 }).limit(1);
            
        } else if (qRole) {
            jobs = await Job.find({
                job_title: {
                    $in: [qRole],
                },
            });
            
        }else if (companyName) {
            jobs = await Job.find({
                company_name: {
                    $in: [companyName],
                },
            });
            

        } else {
            jobs = await Job.find();
            

        }

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;