// * Importing libraries
const func = require("./Util/Function")
const express = require('express')
const bcrypt = require('bcryptjs')
const Datastore = require('nedb')
const path = require('path')
const ip = require('ip')


// * Variable
const localChatDir = path.dirname(__dirname)


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
    res.sendFile('Home.html', {
        root: path.join(localChatDir, './App/Html')
    })
})


// * Login part
app.get('/users', (req, res) => {
    credential.find({ }, (err, doc) => {
        if (err !== null) {
            res.status(500).sendFile('/errorHandling/error 500.html', {
                root: path.join(localChatDir, './App/Html/')
            })
            console.error(`Database error "credential": ${err}`)
        } else {
            func.isArrEqual(doc, []) ? res.send("empty") : res.send(doc)
        }
    })
})



// ? create user
app.post('/user', async (req, res) => {
    try {


        // ! FINDING A VARIABLE THAT WORK
        var nameDifferent
        stuff = () => {
            credential.find({ name: req.body.name }, (err, doc) => {
                if (err !== null) {
                    res.status(500).sendFile('/errorHandling/error 500.html', {
                        root: path.join(localChatDir, './App/Html/')
                    })
                    console.error(`Database error "credential": ${err}`)
                } else {
                    nameDifferent = func.isArrEqual(doc, []) ? false : true
                }
            })
        
        return nameDifferent
    }

        if (req.body.name === undefined ||
            req.body.password === undefined ||
            !func.validPassword(req.body.password)) {
                res.status(400).sendFile('/errorHandling/error 400.html', {
                    root: path.join(localChatDir, './App/Html/')
                })
            } else if ( await stuff() ) {
                res.status(409).sendFile('/errorHandling/error 409.html', {
                    root: path.join(localChatDir, './App/Html/')
            })} else {
                    console.log(`${ stuff()} 2`)    // ! RETURN UNDEFINED 2
                    let user = {
                    name: req.body.name,
                    password: await bcrypt.hash(req.body.password, 10),
                    time: Date.now()
                }
            
            credential.insert(user, (err, newDoc) => {
                if (err !== null) {
                    res.status(500).sendFile('/errorHandling/error 500.html', {
                        root: path.join(localChatDir, './App/Html/')
                    })
                } else {
                    res.status(201).send()
                    console.log(`New user: ${JSON.stringify(newDoc)}`)
                }
                
            })
        }
        
    } catch {
        res.status(500).sendFile('/errorHandling/error 500.html', {
            root: path.join(localChatDir, './App/Html/')
        })
    }
    
})

// ? login
app.post("/user/login", (req, res) => {
    credential.find({ name: req.body.name }, async (err, doc) => {
        if (err !== null) {
            res.status(500).sendFile('/errorHandling/error 500.html', {
                root: path.join(localChatDir, './App/Html/')
            })
            console.error(`Database error "credential": ${err}`)
        } else {
            if (func.isArrEqual(doc, [])) {
                res.status(400).sendFile('/errorHandling/error 400.html', {
                    root: path.join(localChatDir, './App/Html/')
                })
            } else {
                try {
                    // TODO passing "credential to the page"
                    await bcrypt.compare(req.body.password, doc[0].password) ? res.redirect("/Chat")
                    : res.status(401).sendFile('/errorHandling/error 401.html', {
                        root: path.join(localChatDir, './App/Html')
                    })
                    
                } catch {
                    res.status(500).sendFile('/errorHandling/error 500.html', {
                        root: path.join(localChatDir, './App/Html/')
                    })
                }
                
            }
        }
    })
    
})


// ? page for the registering
app.get('/register', (req, res) => {
    res.sendFile('Register.html', {
        root: path.join(localChatDir, './App/Html')
    })
})


// * Get method
// ? send chat page
app.get("/chat", (req, res) => {
    res.sendFile('Chat.html', {
        root: path.join(localChatDir, './App/Html')
    })
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
    res.status(404).sendFile('/errorHandling/error 404.html', {
        root: path.join(localChatDir, './App/Html/')
    })
})
