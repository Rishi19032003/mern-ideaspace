import express from "express"
import router from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

// const express = require("express")

const app = express()
const PORT = process.env.PORT || 5001

//middleware
app.use(express.json()) //this middleware will parse the JSON bodies: req.body

// Implementing a simple middlware funtionality
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} & Req URL is ${req.url}`)
//     next()
// })

app.use(rateLimiter)

app.use("/api/notes", router)

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
