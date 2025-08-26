import express from "express"
import router from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv";
dotenv.config();

// const express = require("express")

const app = express()

connectDB();

app.use("/api/notes", router)

app.listen(5001, () => {
    console.log("Server listening on the port : 5001")
})
