// * Importing libraries
const WebSocket = require('ws')
const express = require('express')
const http = require('http').createServer()


// * Declaring const
const io = require('socket.io')(http, {
    cors: { origin: '*' }
})


// * Initalise
io.on('connection', (socket) => {
    console.log('A connection')

    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
    })
})

http.listen(25565, () => {
    console.log('Server on http://localhost:25565/')
})