import {Health,Reminder} from '../MODELS/healthModel.js'

export const addHealthRecord=async(req,res)=>{
     try{
        const newRecord=new Health(req.body)
        const savedrecord=await newRecord.save()
        res.status(200).json(savedrecord)

     }
     catch(err){
        res.status(500).json({message:'Unable to add health record',err})
     }

}

export const getAllRecords = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    //gte--->greater than or equal to
    //lte--->less than or equal to

    const records = await Health.find(filter).sort({ date: 1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addReminder=async(req,res)=>{
 
         try{
        const newReminder=new Reminder(req.body)
        const savedReminder=await newReminder.save()
        res.status(200).json(savedReminder)

     }
     catch(err){
        res.status(500).json({message:'Unable to add health record',err})
     }

     
}

export const getAllReminders=async(req,res)=>{
     try{
       const reminders=await Reminder.find().sort({date:-1})
       //date=-1----->desc order(latest to earliest)
       //date=1----->asc order(earliest to latest)
       res.status(200).json(reminders)


     }
     catch(err){
        res.status(500).json({message:'Unable to fetch reminders',err})
     }
    
}