const Student = require("../models/Student");

// 1. Register a new student
exports.studentRegistration = async (req, res) => {
	try {
		const { name, email, age, course } = req.body;

		if (!name || !email || !age || !course) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const existingStudent = await Student.findOne({ email });
		if (existingStudent) {
			return res.status(400).json({
				success: false,
				message: "user allready exists.",
			});
		}

		const newStudent = await Student.create({ name, email, age, course });

		return res.status(201).json({
			success: true,
			data: newStudent,
			message: "Student registered successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong while registering the student.",
			error: error.message,
		});
	}
};

// 2. Get all students
exports.studentList = async (req, res) => {
	try {
		const students = await Student.find({});

		if (!students.length) {
			return res.status(200).json({
				success: true,
				message: "No students found .",
				data: [],
			});
		}

		return res.status(200).json({
			success: true,
			data: students,
			message: "All students fetched successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch student list.",
			error: error.message,
		});
	}
};

//  delete the student
exports.removeStudent = async (req, res) => {
	try {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Student ID is required.",
			});
		}

		const deletedStudent = await Student.findByIdAndDelete(id);

		if (!deletedStudent) {
			return res.status(404).json({
				success: false,
				message: "Student not found.",
			});
		}

		return res.status(200).json({
			success: true,
			data: deletedStudent,
			message: "Student removed successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error deleting student.",
			error: error.message,
		});
	}
};

//  Search students by name
exports.searchStudent = async (req, res) => {
	try {
		const { name } = req.query;

		if (!name) {
			return res.status(400).json({
				success: false,
				message: "Name is required to perform search.",
			});
		}

		const students = await Student.find({
			name: { $regex: name, $options: "i" },
		});

		return res.status(200).json({
			success: true,
			data: students,
			message: "Matching students found.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Search operation failed.",
			error: error.message,
		});
	}
};

// sigle student ka details
exports.studentDetails = async (req, res) => {
	try {
		const { id } = req.params;

		const student = await Student.findById(id);

		if (!student) {
			return res.status(404).json({
				success: false,
				message: "Student not found.",
			});
		}

		return res.status(200).json({
			success: true,
			data: student,
			message: "Student details fetched successfully.",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch student details.",
			error: error.message,
		});
	}
};
