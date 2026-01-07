// import {Health,Reminder} from '../MODELS/healthModel.js'

// export const addHealthRecord=async(req,res)=>{
//      try{
//         const newRecord=new Health(req.body)
//         const savedrecord=await newRecord.save()
//         res.status(200).json(savedrecord)

//      }
//      catch(err){
//         res.status(500).json({message:'Unable to add health record',err})
//      }

// }

// export const getAllRecords = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     let filter = {};
//     if (startDate && endDate) {
//       filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }
//     //gte--->greater than or equal to
//     //lte--->less than or equal to

//     const records = await Health.find(filter).sort({ date: 1 });
//     res.status(200).json(records);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const addReminder=async(req,res)=>{
 
//          try{
//         const newReminder=new Reminder(req.body)
//         const savedReminder=await newReminder.save()
//         res.status(200).json(savedReminder)

//      }
//      catch(err){
//         res.status(500).json({message:'Unable to add health record',err})
//      }

     
// }

// export const getAllReminders=async(req,res)=>{
//      try{
//        const reminders=await Reminder.find().sort({date:-1})
//        //date=-1----->desc order(latest to earliest)
//        //date=1----->asc order(earliest to latest)
//        res.status(200).json(reminders)


//      }
//      catch(err){
//         res.status(500).json({message:'Unable to fetch reminders',err})
//      }
    
// }

import { Health, Reminder } from "../MODELS/healthModel.js";
import User from "../models/User.js";

import nodemailer from "nodemailer";
import { generateHealthSummary } from "../utils/HealthReport.js";

/* ================= ADD HEALTH RECORD ================= */
export const addHealthRecord = async (req, res) => {
  try {
    const newRecord = new Health({
      ...req.body,
      userId: req.user._id,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({
      message: "Unable to add health record",
      error: err.message,
    });
  }
};

/* ================= GET HEALTH RECORDS ================= */
export const getAllRecords = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = { userId: req.user._id };

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Health.find(filter).sort({ date: 1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= ADD REMINDER ================= */
export const addReminder = async (req, res) => {
  try {
    const newReminder = new Reminder({
      ...req.body,
      userId: req.user._id,
    });

    const savedReminder = await newReminder.save();
    res.status(201).json(savedReminder);
  } catch (err) {
    res.status(500).json({
      message: "Unable to add reminder",
      error: err.message,
    });
  }
};

/* ================= GET REMINDERS ================= */
export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      userId: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({
      message: "Unable to fetch reminders",
      error: err.message,
    });
  }
};

//share with doctor
export const shareWithDoctor = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctorEmail } = req.body;

    if (!doctorEmail)
      return res.status(400).json({ message: "Doctor email required" });

    const user = await User.findById(userId);
    const records = await Health.find({ userId });

    if (records.length === 0)
      return res.status(400).json({ message: "No health data available" });

    
    const report = await generateHealthSummary(user, records);

    // 📧 Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
     auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
    });

    await transporter.sendMail({
      from: `"RetireNow Health" <${process.env.EMAIL_USER}>`,
      to: doctorEmail,
      subject: `Health Report – ${user.name}`,
      html: report,
    });

    res.json({ message: "Report shared successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

