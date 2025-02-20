const express = require("express");
const router = express.Router();
const {createActivityLog,getAllActivityLogs} = require("../controller/activitycontroller");
const ActivityLog = require("../models/ActivityLogmodel");



module.exports=(app)=>{
    const io=app.get('io')
    io.on("connection",(socket)=>{
        console.log("Client connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
          });

    })

}


const emitNewLog=async(logId)=>{
    const Log=await ActivityLog(logId).populate("User")

    io.emit("newAcitvityLog",Log)
}


router.post('/',async(req,res)=>{
    try {
        const newLog=new ActivityLog(req.body)
        const savedLog=await newLog.save()

        emitNewLog(savedLog._id)

        res.status(201).json(savedLog)
        
    } catch (error) {
        res.status(500).json({ message: "Error creating activity log", error });
        
    }
})

router.get('/',async(req,res)=>{
   try {
    const logs=await ActivityLog.find().populate("User")
    res.status(200).json(logs);
    res.status(500).json({ message: "Failed to fetch logs", error });
   } catch (error) {
    
   }

})

module.exports = router;


