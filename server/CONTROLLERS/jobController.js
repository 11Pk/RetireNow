import Job from "../models/jobModel.js";
import User from "../models/User.js";

// ADD JOB
export const addJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Could not add job", err });
  }
};

// GET ALL JOBS
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch jobs", err });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Could not update job", err });
  }
};

// RECOMMEND JOBS BASED ON USER INTERESTS
export const recommendJobs = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user || !user.interests)
      return res.status(400).json({ message: "User interests not found" });

    const userInterests = user.interests.map(i => i.toLowerCase());

    const jobs = await Job.find();

    const recommended = jobs.filter((job) =>
      job.skills.some(skill =>
        userInterests.includes(skill.toLowerCase())
      )
    );

    res.json(recommended);
  } catch (err) {
    res.status(500).json({ message: "Could not recommend jobs", err });
  }
};
