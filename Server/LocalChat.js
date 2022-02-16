// * Importing libraries
const fun = require("./Util/function")
const WebSocket = require("ws")
const http = require("http")
const fs = require("fs")

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader("content-type", "text/plain")
//     fs.readFile(fun.localChatDir() + '/App/Chat.html', null, function (error, data) {
//         if (error) {
//             res.writeHead(404)
//             res.write('Whoops! File not found!')
//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// })



http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html' })

    fs.readFile(fun.localChatDir() + '/App/Chat.html', null, function (error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Whoops! File not found!')

        } else {
            res.write(data)

        }
        res.end()
    })
}).listen(fun.IP("port"), fun.IP("ip"), () => {
    console.log(`server running at http://${fun.IP()}/`)
    fun.initDb()
})

// const Sserver = new WebSocket.Server({ port: fun.IP("port") })

// Sserver.on("connection", socket => {
//     socket.on("message", message => {

//         socket.send(`message: ${message}`)
//     })
// })

