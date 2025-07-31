const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number
	},
	course: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model("Student", studentSchema);