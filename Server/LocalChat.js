// * Importing libraries
const func = require("./Util/Function")
const express = require('express')
const bcrypt = require('bcryptjs')
const Datastore = require('nedb')
const path = require('path')
const ip = require('ip')

// * Variable
const localChatDir = func.localChatDir()
require('dotenv').config({ path: path.join(localChatDir, '/Server/Util/.env') })


// * Setup thingy
const { json } = require('express/lib/response')
const credential = new Datastore({ filename: path.join(localChatDir, '/Server/Database/credential.db') })
const message = new Datastore({ filename: path.join(localChatDir, '/Server/Database/message.db') })
const app = express()


// * File management
app.use(express.static(localChatDir))
credential.loadDatabase()
app.use(express.json())
message.loadDatabase()


// * Startup
const IPv4 = ip.address()
const port = 25565
const IP = IPv4

app.listen(port, IP, () => {
    console.log(`Local Chat open at http://${IP}:${port}/`)
})


// * Front page
app.get('/', (req, res) => {
    console.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} logged`)
    func.sendFile(res, 'Home.html')
    
})


// * Login part
app.get('/users', (req, res) => {
    let doc = func.getUserby(res, {})
    func.isArrEqual(doc, []) ? res.send("empty") : res.send(doc)
})



// ? create user
app.post('/user', async (req, res) => {
    try {
        if (req.body.name === undefined ||
            req.body.password === undefined ||
            !func.validPassword(req.body.password)) {
                func.statusExport(res, 400)
                
            } else if ( func.isArrEqual(func.getUserby(res, { name: req.body.name }), []) ? false : true ) {
                func.statusExport(res, 409)
                
            } else {
                let user = {
                    name: req.body.name,
                    password: await bcrypt.hash(req.body.password, 10),
                    time: Date.now()
                }
                func.newUser(user)
                
            }
            
    } catch {
        func.statusExport(res, 500)
    }
        
})
    
    
    // ? login
    app.post("/user/login", (req, res) => {
        credential.find({ name: req.body.name }, async (err, doc) => {
            if (err !== null) {
                func.statusExport(res, 500)
                console.error(`Database error "credential": ${err}`)
                
            } else {
                if (func.isArrEqual(doc, [])) {
                    func.statusExport(res, 400)
                    
                } else {
                    try {
                        // TODO passing "credential to the page"
                        await bcrypt.compare(req.body.password, doc[0].password) ? res.redirect("/Chat")
                        : func.statusExport(res, 401)
                        
                    } catch {
                        func.statusExport(res, 500)
                    }
                
            }
        }
    })
    
})


// ? page for the registering
app.get('/register', (req, res) => {
    func.sendFile(res, 'Register.html')
})


// * Get method
// ? send chat page
app.get("/chat", (req, res) => {
    func.sendFile(res, 'Chat.html')
})

// // app.get('/chat/:id', (req, res) => {
// //     req.params.id === '' ?
// //         res.sendFile('/errorHandling/error 401.html', {
// //             root: path.join(localChatDir, './App/Html')
// //         }) :

// //         res.sendFile('Chat.html', {
// //             root: path.join(localChatDir, './App/Html')
// //         })
// // })


// * Post method
// // app.post('/login', (req, res) => {
// //     credential.insert(req.body)
// //     console.log(req.body)

// //     res.send({
// //         user: req.body.user,
// //         password: req.body.password,
// //         time: req.body.time
// //     })
// // })


// ! Error Handling
// // app.get('/chat', (req, res) => {
    // //     res.status(401).sendFile('/errorHandling/error 401.html', {
        // //         root: path.join(localChatDir, './App/Html/')
        // //     })
        // // })
        
app.get('*', (req, res) => {
    func.statusExport(res, 404)
})