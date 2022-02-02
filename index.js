const express = require("express")
const ip = require("ip")

const { json } = require("express/lib/response")
const app = express()

// "localhost"
const IPv4 = ip.address()
const port = 25565
const IP = IPv4

app.listen(port, IP, () => {
    console.log(`Chat aperta su ${IP}:${port}`)
})

app.use(express.static("App"))
app.use(express.json());

app.post("/", (req, res) => {
    console.log(__dirname)
})

app.post("/login", (req, res) => {
    console.log(req);
    res.sendFile("");
})

app.post("/login/admin", (req, res) => {
    console.log(req);
})