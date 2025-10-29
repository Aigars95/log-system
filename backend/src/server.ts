import express from "express";
import cors from "cors";
import logsRouter from "./routes/logs.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/logs", logsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
}).on("error", (err) => {
    console.error("❌ Server failed to start:", err);
});
