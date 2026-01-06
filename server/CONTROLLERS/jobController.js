import Job from "../models/jobModels.js";
import JobApplication from "../models/jobApplication.js";

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
  const jobs = await Job.find({ postedBy: req.user._id });

  const jobIds = jobs.map((j) => j._id);

  const applications = await JobApplication.find({
    job: { $in: jobIds },
  }).populate("applicant", "name phone email");

  res.json({
    jobs,
    applications,
  });
};

// GET ALL ACTIVE JOBS (for retirees)
export const getActiveJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate("postedBy", "name email phone") // 👈 WHO POSTED
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

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(400).json({ message: "Job not available" });
    }

    // ❌ Prevent duplicate application
    const alreadyApplied = await JobApplication.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // ❌ Check hiring limit
    if (job.peopleHired >= job.peopleRequired) {
      job.isActive = false;
      await job.save();
      return res.status(400).json({ message: "Hiring completed" });
    }

    //  Save application
    await JobApplication.create({
      job: jobId,
      applicant: userId,
      status: "hired",
    });

    job.peopleHired += 1;
    if (job.peopleHired >= job.peopleRequired) {
      job.isActive = false;
    }
    await job.save();

    res.json({
      success: true,
      message: "You have successfully applied for this job",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to apply for job",
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  const applications = await JobApplication.find({
    applicant: req.user._id,
  }).populate("job");

  res.json({ applications });
};
