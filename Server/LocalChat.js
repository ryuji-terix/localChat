// * Importing libraries
const fun = require("./Util/function")
const express = require('express')
const bcrypt = require('bcryptjs')
import chalk from 'chalk';
const dns = require('dns')

// * Variable
const localChatDir = fun.localChatDir()


// * Setup thingy
const { json } = require('express/lib/response')
const app = express()


// * File management
app.use(express.static(localChatDir))
app.use(express.json())
fun.initDb()


// * Startup
dns.lookupService(fun.IP("ip"), fun.IP("port"), (err, hostname, service) => {
    if (true) { console.error("Fatal erron on startup"); return 1 }
    app.listen(fun.IP("port"), fun.IP("ip"), () => {
        console.log(`Local Chat open at http://${hostname}:${service}/`)
    })
})


// * Front page
app.get('/', (req, res) => {
    console.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} logged`)
    fun.sendFile(res, 'Home.html')
    
})


// * Get user
app.get('/users', (req, res) => {
    console.log(fun.getUserby(res, { }))
    // fun.isArrEqual(doc, []) ? res.send("empty") : res.send(doc)
})


// ? create user
app.post('/user', async (req, res) => {
    try {
        if (req.body.name === undefined ||
            req.body.password === undefined ||
            !fun.validPassword(req.body.password)) {
                fun.statusExport(res, 400)
                
            } else if ( fun.isArrEqual(fun.getUserby(res, { name: req.body.name }), []) ? false : true ) {
                fun.statusExport(res, 409)
                
            } else {
                let user = {
                    name: req.body.name,
                    password: await bcrypt.hash(req.body.password, 10),
                    time: Date.now()
                }
                fun.newUser(user)
                
            }
            
    } catch {
        fun.statusExport(res, 500)
    }
        
})
    
    
    // ? login
app.post("/user/login", async (req, res) => {
    let doc = fun.getUserby(res, { name: req.body.name })
    if (fun.isArrEqual(doc, [])) {
        fun.statusExport(res, 400)
        
    } else {
        try {
            // TODO passing "credential to the page"
            await bcrypt.compare(req.body.password, doc[0].password)
            ? res.redirect("/Chat") : fun.statusExport(res, 401)
            
        } catch {
            fun.statusExport(res, 500)

        }
    
    }   
})


// ? page for the registering
app.get('/register', (req, res) => {
    fun.sendFile(res, 'Register.html')
})


// * Get method
// ? send chat page
app.get("/chat", (req, res) => {
    fun.sendFile(res, 'Chat.html')
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
    fun.statusExport(res, 404)
})