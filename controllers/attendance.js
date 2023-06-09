const BigPromise = require("../middleware/Bigpromise")
const Attendance = require("../models/attendance")
const WhereClause = require("../util/whereClause")

// add attendance
exports.addattendance = BigPromise(async(req,res,next)=>{
    const {userId,AttendanceDate,isPresent} = req.body
    const att = await Attendance.create({userId,AttendanceDate,isPresent,lectureId:req.user._id})
    res.status(200).json({
        success:true,
        att
    })
})


// get attendance
exports.getAttendance = BigPromise(async(req,res,next)=>{
    const attendanceList =  new WhereClause(Attendance.find(req.body),req.query).pager(2) 
    let att = await attendanceList.base.populate("userId").exec();
    res.status(200).json({
success:true,
att
    })
})


// getting Individual Attendance
exports.getIndividualAttendance = BigPromise(async(req,res,next)=>{
    // const attendanceList =  new WhereClause(Attendance.find(req.body),req.query).pager(2) 
    const {id} = req.params;
    let att = await Attendance.find({"userId":id}).populate("lectureId")
    .exec();
    // att.lectureId.email = undefined
    // att.lectureId.phone = undefined
    // att.lectureId.timestamp = undefined
    // att.lectureId.isLoginGoogle = undefined
    res.status(200).json({
success:true,
id:id,
att
    })
})

// adding bulk attendance
exports.BulkAttendanceAdd = BigPromise(async(req,res,next)=>{
    //DO remove the attendace already exists

    const att = await Attendance.insertMany(req.body.data)
    res.status(200).json({
        success:true,
        att
    })
})


