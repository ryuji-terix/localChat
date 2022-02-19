// * Importing libraries
const express = require('express')
const path = require ('path')
const Datastore = require('nedb')
const ip = require('ip')
const app = express()


// * Declaring const
const message = new Datastore({ filename: '/Server/database' })
const localChatDir = path.dirname(__dirname)


// * Setup thingy
const server = app.listen(25565, ip.address(), () => serverSetup())
const { json } = require('express/lib/response')
const io = require('socket.io')(server)


// * File management
app.use(express.static(localChatDir))
app.use(express.json())


// * Initalise
serverSetup = () => {
    console.log(`Local Chat open at http://${ip.address()}:${25565}/`)
}


io.on('connection', (socket) => {
    console.log('A connection')

    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
    })
})


// * Front page
app.get('/', (req, res) => {
    console.log('A user logged')
    res.sendFile('Chat.html', { root: './App' })
})


// ! Error Handling
app.get('*', (req, res) => {
    res.status(404).sendFile(`/errorHandling/error 404.html`, {
        root: path.join(localChatDir, './App/Html/')
    })
})