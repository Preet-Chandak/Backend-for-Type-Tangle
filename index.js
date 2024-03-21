const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

const { generateFile } = require('./generateFile');
const { executeCode } = require('./executeCode');
const { executepy } = require('./executepy');
const Job = require("./models/Job");

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/compilerapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected successfully to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ hello: "world!!" });
});

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
    }

    try {
        const filePath = await generateFile(language, code);
        const job = await Job.create({ language, filePath, code });
        const jobId = job["_id"];

        let output;
        if (language === "cpp") {
            output = await executeCode(filePath);
        } else if (language === "py") {
            output = await executepy(filePath);
        }

        job.output = output;
        await job.save();

        return res.json({ jobId, filePath, output });
    } catch (error) {
        console.error("Error executing code:", error);
        return res.status(500).json({ error: "Error executing code" });
    }
});

app.get("/output/:jobId", async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, error: "Job not found" });
        }

        return res.json({ success: true, output: job.output });
    } catch (error) {
        console.error("Error fetching output:", error);
        return res.status(500).json({ success: false, error: "Error fetching output" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
