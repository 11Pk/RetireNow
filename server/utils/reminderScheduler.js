import cron from "node-cron";
import { Reminder } from "../MODELS/healthModel.js";
import { sendEmail } from "./sendEmail.js";
import User from "../models/User.js";


// Run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    //start of today

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Find reminders whose date is today and not notified yet
    const reminders = await Reminder.find({
      date: { $gte: today, $lt: tomorrow },
      notified: false,
    }).populate("userId");

    for (const reminder of reminders) {
      if (reminder.userId?.email) {
        const emailText = `Hello ${reminder.userId.name || "User"},\n\nThis is a reminder for: "${reminder.title}".\nScheduled for: ${reminder.date.toDateString()}.\n\n- RetireWell App`;
        await sendEmail(reminder.userId.email, "Reminder Notification", emailText);
        reminder.notified = true;
        await reminder.save();
        console.log(`Email sent for reminder: ${reminder.title}`);
      }
    }

    console.log("Daily reminder check complete");
  } catch (err) {
    console.error("Error checking reminders:", err);
  }
});

