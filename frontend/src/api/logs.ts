
import { api } from "./axiosInstance"
import type { LogType } from "../types/logType"
import { toast } from "react-hot-toast"

export function getLogs(): Promise<LogType[]> {
    return api.get<LogType[]>("/logs")
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            toast.error("Failed to load logs")
            throw err
        })
}

export function createLog(owner: string, text: string): Promise<LogType> {
    return api.post<LogType>("/logs", { owner, text })
        .then((res) => {
            toast.success("Log created")
            return res.data
        })
        .catch((err) => {
            toast.error("Failed to create log")
            throw err
        })
}


export function updateLog(id: number, data: Partial<LogType>): Promise<void> {
    return api.put(`/logs/${id}`, data)
        .then(() => {
            toast.success("Log updated")
        })
        .catch((err) => {
            toast.error("Failed to update log")
            throw err
        })
}


export function deleteLog(id: number): Promise<void> {
    return api.delete(`/logs/${id}`)
        .then(() => {
            toast.success("Log deleted")
        })
        .catch((err) => {
            toast.error("Failed to delete log")
            throw err
        })
}
