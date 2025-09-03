import express from "express"
import router from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"

dotenv.config();

// const express = require("express")

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

//middleware
app.use(express.json()) //this middleware will parse the JSON bodies: req.body

// Implementing a simple middlware funtionality
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} & Req URL is ${req.url}`)
//     next()
// })

//Adding CORS Middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}

app.use(rateLimiter)

app.use("/api/notes", router)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server listening on the port", PORT)
        })
    })

    .catch(err => {
        console.error("Failed to connect DB:", err)
        process.exit(1)
    })
