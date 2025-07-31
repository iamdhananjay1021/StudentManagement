
const { studentRegistration, studentList, removeStudent, searchStudent, studentDetails } = require("../controllers/student");
const { validateStudent } = require("../middleware/validateStudent");

const router = require("express").Router();

router.get("/test", (req, res) => {
	res.send("working")
})

router.post("/registration", studentRegistration);
router.get('/search', searchStudent)
router.get('/student', studentList);
router.get('/student/:id', studentDetails)
router.post('/student/remove', removeStudent);

module.exports = router;