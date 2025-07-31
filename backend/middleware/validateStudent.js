const { check, validationResult } = require("express-validator");


const validateStudent = [
	check("name").notEmpty().withMessage("Name is required"),
	check("email").isEmail().withMessage("Valid email is required"),
	check("age").isInt({ min: 1 }).withMessage("Age must be a valid number"),
	check("course").notEmpty().withMessage("Course is required"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}
		next();
	},
];

module.exports = { validateStudent };
