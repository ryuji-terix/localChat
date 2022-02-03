const express = require("express")
const path = require('path')
const ip = require("ip")

// const { json } = require("express/lib/response")
const app = express()

// "localhost"
const IPv4 = ip.address()
const port = 25565
const IP = IPv4

// Importing file
app.use(express.static(__dirname))
// app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile('Home.html', {
        root: path.join(__dirname, './App/Html')
    })
})

app.listen(port, IP, () => {
    console.log(`Local Chat open at ${IP}:${port}`)
})

app.get("/login", (req, res) => {
    res.sendFile('Login.html', {
        root: path.join(__dirname, './App/Html/')
    })
})