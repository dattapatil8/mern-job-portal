const Job = require("../models/job");


const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            recruiter: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("recruiter", "name email");

        res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getSingleJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate(
            "recruiter",
            "name email"
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            job: updatedJob
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Job Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createJob,
    getJobs,
    getSingleJob,
    updateJob,
    deleteJob
};
