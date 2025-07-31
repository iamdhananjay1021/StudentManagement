const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const router = require("./routes/studentRoutes")
const cors = require('cors');

require("dotenv").config();
app.use(express.json())
app.use(cors());
app.use("/api/v1", router)


const PORT = process.env.PORT || 3000;
dbConnect()

app.get("/", (req, res) => {
	res.send("welcome")
})

app.listen(PORT, () => {
	console.log(`server is listening on PORT ${PORT}`)
})