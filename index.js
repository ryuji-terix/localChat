const express = require("express")
const path = require('path')
const ip = require("ip")

// const { json } = require("express/lib/response")
const app = express()

// "localhost"
const IPv4 = ip.address()
const port = 25565
const IP = "localhost"

// app.use(express.static(path.join(__dirname, './App/Css')))
// app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile('Home.html', {
        root: path.join(__dirname, './App/')
    })
})

app.listen(port, IP, () => {
    console.log(`Chat aperta su ${IP}:${port}`)
    console.log(path.join(__dirname, './App/'))
})

app.get("/login", (req, res) => {
    res.sendFile('Login.html', {
        root: path.join(__dirname, './App/')
    })
})
