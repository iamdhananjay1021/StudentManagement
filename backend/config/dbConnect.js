const mongoose = require("mongoose");

const dbConnect = async () => {
	try {
		const dbResponse = await mongoose.connect(process.env.MONGO_URI)

		if (dbResponse) {
			console.log("database connected successfully")
		}

	} catch (error) {
		console.log("db connection failed", error.message);
		process.exit(1);
	}
}

module.exports = dbConnect;