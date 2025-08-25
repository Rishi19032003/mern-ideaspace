import express from "express"
// const express = require("express")

const app = express()

app.listen(5001, () => {
    console.log("Server listening on the port : 5001")
})