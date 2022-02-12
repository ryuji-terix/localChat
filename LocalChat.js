// * Importing libraries
const express = require("express")
// const bcrypt = require('bcryptjs')
const Datastore = require("nedb")
const path = require('path')
const ip = require("ip")


// * Setup thingy
const { json } = require("express/lib/response")
const credential = new Datastore("credential.db")
const message = new Datastore("message.db")
const app = express()


// * File management
app.use(express.static(__dirname))
credential.loadDatabase()
message.loadDatabase()
app.use(express.json());


// * Startup
const IPv4 = ip.address()
const port = 25565
const IP = IPv4

app.listen(port, IP, () => {
    console.log(`Local Chat open at http://${IP}:${port}/`)
})


// * Front page
app.get("/", (req, res) => {
    console.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} logged`)
    res.sendFile('Home.html', {
        root: path.join(__dirname, './App/Html')
    })
})


// * Get method
app.get("/chat/:id", (req, res) => {
    req.params.id === "" ?
        res.sendFile("/errorHandling/error 401.html", {
            root: path.join(__dirname, './App/Html/')
        }) :

        res.sendFile('Chat.html', {
            root: path.join(__dirname, './App/Html/')
        })
})

app.get("/register", (req, res) => {
    res.sendFile('Register.html', {
        root: path.join(__dirname, './App/Html/')
    })
})


// * Post method
app.post("/login", (req, res) => {
    credential.insert(req.body)
    console.log(req.body)

    res.send({
        user: req.body.user,
        password: req.body.password,
        time: req.body.time
    })
})



// ! Error Handling
app.get("/chat", (req, res) => {
    res.sendFile("/errorHandling/error 401.html", {
        root: path.join(__dirname, './App/Html/')
    })
    res.status(401)
})

app.get('*', function (req, res) {
    res.status(404).sendFile("/errorHandling/error 404.html", {
        root: path.join(__dirname, './App/Html/')
    })
});