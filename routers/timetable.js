const express = require("express")
const router = express.Router()
const {addTimeTable,getLectureTimeTable,getTimeTable} = require("../controllers/timetable")
const {isLogined,customRole} = require("../middleware/user")


router.route("/addtimetable").post(isLogined,addTimeTable)
router.route("/getlecturetable").get(isLogined,customRole("lecturer"),getLectureTimeTable)
router.route("/gettimetable/:department/:section").get(isLogined,getTimeTable)
module.exports = router;