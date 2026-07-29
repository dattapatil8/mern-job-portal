const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
    createJob,
    getJobs,
    getSingleJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

router.post(
    "/",
    protect,
    role("employer"),
    createJob
);


router.get("/", getJobs);


router.get("/:id", getSingleJob);


router.put(
    "/:id",
    protect,
    role("employer"),
    updateJob
);


router.delete(
    "/:id",
    protect,
    role("employer"),
    deleteJob
);

module.exports = router;