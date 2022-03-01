// * Importing libraries
const express = require('express')
const Datastore = require('nedb')
const path = require ('path')
const ip = require('ip')
const app = express()


// * Declaring const
const localChatDir = path.dirname(__dirname)
const db = new Datastore({ filename: path.join(localChatDir, '/Server/database/message.db') })


// * Setup thingy
const server = app.listen(25565, ip.address(), () => serverSetup())
const { json } = require('express/lib/response')
const io = require('socket.io')(server)


// * File management
app.use(express.static(localChatDir))
app.use(express.json())
db.loadDatabase(err => {
    err ? console.log(err) : ""
});

// * Initalise
serverSetup = () => {
    console.log(`Local Chat open at http://${ip.address()}:${25565}/`)
}


io.on('connection', (socket) => {
    console.log('A connection')

    socket.on('message', (message) => {
        let entrance = {
            author: socket.id.substr(0,3),
            msg: message,
            time: Date.now()
        }

        db.insert( entrance )
        io.emit('message', entrance)
    })
})


// * Front page
app.get('/', (req, res) => {
    res.sendFile('Chat.html', { root: './App' })
})

app.get('/msg', (req, res) => {
    db.find({ }, (err, docs) => err ? res.status(500) : res.send(docs))
})


// ! Error Handling
app.get('*', (req, res) => {
    res.status(404).sendFile(`/errorHandling/error 404.html`, {
        root: path.join(localChatDir, './App/Html/')
    })
})

