import Job from "../models/jobModels.js";

/**
 * CREATE JOB (age < 50)
 */
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      profession,
      location,
      peopleRequired,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      profession,
      location,
      peopleRequired,
      postedBy: req.user._id, // 🔑 logged-in provider
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

/**
 * GET MY JOBS (provider dashboard)
 */
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};
