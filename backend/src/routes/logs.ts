import { Router, Request, Response } from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LogType } from "../types/logType.js";

const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "../data");
const dataPath = path.join(dataDir, "logs.json");

function ensureDataFile(): void {
    if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
        console.log("Created data directory:", dataDir);
    }

    if (!existsSync(dataPath)) {
        writeFileSync(dataPath, "[]", "utf-8");
        console.log("Created logs.json with empty array");
    }
}


function loadLogs(): LogType[] {
    ensureDataFile();
    try {
        const data = readFileSync(dataPath, "utf-8");
        const parsed = JSON.parse(data);
        return parsed as LogType[];
    } catch (err) {
        console.error("Failed to read logs.json:", err);
        return [];
    }
}

function saveLogs(logs: LogType[]): void {
    try {
        writeFileSync(dataPath, JSON.stringify(logs, null, 2), "utf-8");
        console.log(`💾 Saved ${logs.length} logs to file`);
    } catch (err) {
        console.error("Failed to save logs.json:", err);
    }
}

let logs: LogType[] = loadLogs();


router.get("/", (req: Request, res: Response) => {
    res.json(logs);
});


router.post("/", (req: Request, res: Response) => {
    const newLog: LogType = {
        id: Date.now(),
        owner: req.body.owner || "Unknown",
        text: req.body.text || "",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    logs.push(newLog);
    saveLogs(logs);
    res.status(201).json(newLog);
});


router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = logs.findIndex((log) => log.id === id);

    if (index === -1) return res.status(404).json({ error: "Log not found" });

    logs[index] = { ...logs[index], ...req.body, updatedAt: new Date() };
    saveLogs(logs);
    res.json({ success: true, updated: logs[index] });
});


router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = logs.findIndex((log) => log.id === id);

    if (index === -1) return res.status(404).json({ error: "Log not found" });

    logs.splice(index, 1);
    saveLogs(logs);
    res.json({ success: true });
});

export default router;
