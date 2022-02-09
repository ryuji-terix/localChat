const express = require("express")
// const bcrypt = require('bcryptjs')
const Datastore = require("nedb")
const path = require('path')
const ip = require("ip")

const blankArray = []
const equals = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}



// const { json } = require("express/lib/response")
const credential = new Datastore("credential.db")
// const message = new Datastore("message.db")
const app = express()



// "localhost"
const IPv4 = ip.address()
const port = 25565
const IP = IPv4

app.listen(port, IP, () => {
    console.log(`Local Chat open at http://${IP}:${port}/`)
})



// NOTE: Importing file
app.use(express.static(__dirname))
credential.loadDatabase()
// message.loadDatabase()
app.use(express.json());



// Page loading
app.get("/", (req, res) => {
    res.sendFile('Home.html', {
        root: path.join(__dirname, './App/Html')
    })
})

app.post("/login", (req, res) => {
    // credential.find({ user: req.body.user }, (e, doc) => {
        // if (equals(doc, blankArray)) {
            credential.insert(req.body)
            console.log(req.body)

            res.send({
                user: req.body.user,
                password: req.body.password,
                time: req.body.time
            })
            // res.status(201)

            //Object created


    //     } else {
    //         res.status(400) //Bad Request
    //         console.error(`User (${req.body.user}) already exist`)

    //         res.send(`User "${req.body.user}" already exist`)

    //         res.status(201)
    //     }
    // )
})
// })

app.get("/chat", (req, res) => {
    res.sendFile('Chat.html', {
        root: path.join(__dirname, './App/Html/')
    })
})



// Request handler



// req.query.password = bcrypt.hashSync(req.query.password, 10)
// app.get("/alldb", (req, res) => {
    //     database.find({}, (err, data) => {
        //         err ? res.end() : ""
        //         res.json(data)
        //     })
        // })