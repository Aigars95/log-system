# 🌐 Web Interface for Log System

> A clean and responsive **web dashboard** for managing logs, built with  
> **React + TypeScript + TailwindCSS** on the frontend and **Express + TypeScript** on the backend.  
> Stores data in a simple local JSON file — ideal for internal tools, testing, and learning CRUD architecture.

---

## 🌍 Live Demo

- **Frontend (Vercel):** [https://log-system-rho.vercel.app](https://log-system-rho.vercel.app)
- **Backend (Render):** [https://log-system-vv1g.onrender.com](https://log-system-vv1g.onrender.com)

---

## 📸 Screenshots   

```
<p align="center">
  <img src="./frontend/public/screenshot-desktop.png?raw=true" alt="Desktop Table View" width="48%" />
  <img src="./frontend/public/screenshot-mobile.png?raw=true" alt="Mobile Card View" width="48%" />
</p>
```

---

## ⚙️ Tech Stack

**Frontend:** React, TypeScript, TailwindCSS v4  
**Backend:** Express, TypeScript, Node.js  
**Storage:** Local JSON (`data/logs.json`)  
**Utilities:** Axios, ResizeObserver, react-hot-toast  

---

## 🚀 Quick Start

### 1️⃣ Run Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on **http://localhost:5000**

### 2️⃣ Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **http://localhost:5173**

✅ Make sure `frontend/src/api/axiosInstance.ts` has the correct backend URL:
```ts
export const api = axios.create({
  baseURL: "http://localhost:5000",
})
```

---

## 📂 Project Structure

```
backend/
 ├── routes/logs.ts
 ├── types/logType.ts
 ├── data/logs.json
 └── server.ts

frontend/
 ├── src/
 │   ├── api/logs.ts
 │   ├── components/
 │   │   ├── LogTable.tsx
 │   │   ├── LogsTableRow.tsx
 │   │   ├── LogCard.tsx
 │   │   ├── LogEditModal.tsx
 │   │   └── ui/
 │   │        ├── Alert.tsx
 │   │        ├── Button.tsx
 │   │        ├── Modal.tsx
 │   │        ├── Pagination.tsx
 │   │        ├── Spinner.tsx
 │   │        └── Tooltip.tsx
 │   ├── utils/formatDate.ts
 │   └── types/logType.ts
 ├── main.tsx
 └── index.css
```

---

## 🖥️ Backend API

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/logs` | Get all logs |
| **POST** | `/logs` | Create a new log |
| **PUT** | `/logs/:id` | Update an existing log |
| **DELETE** | `/logs/:id` | Delete a log |

Each log entry:
```ts
interface LogType {
  id: number
  owner: string
  text: string
  createdAt: string | Date
  updatedAt: string | Date
}
```

---

## 💻 Frontend Overview

| Feature | Description |
|----------|-------------|
| 🧱 CRUD | Full create, read, update, delete functionality |
| 🪄 Edit Modal | Clean modal for editing `owner` and `text` |
| 💬 Tooltip | Appears only when text is truncated |
| 📱 Responsive Layout | Table on desktop → Cards on mobile |
| ⚙️ Pagination | Reusable UI component |
| ⚡ Spinner | Shown during loading or API calls |
| 🚨 Alert | Displays “No logs found” when empty |
| 🧠 Utility | `formatDate()` for unified date display |

---


## ✅ Status Overview

| Area | Status |
|------|--------|
| Backend API | ✅ Stable |
| Frontend CRUD | ✅ Implemented |
| Responsive Design | ✅ Completed |
| Tooltip Logic | ✅ Smart & adaptive |
| Pagination | ✅ Modular & reusable |
| UI/UX | ✅ Polished |
| TypeScript | ✅ End-to-end typing |
| Code Quality | ✅ Clean & maintainable |
