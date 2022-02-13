// * Importing libraries
const express = require('express')
const bcrypt = require('bcryptjs')
const Datastore = require('nedb')
const path = require('path')
const ip = require('ip')


// * Variable
const localChat = path.dirname(__dirname)
const errorMessage = "Ops, an error occurred!"


// * Method
validPassword = (psw) => {
    if (psw.length < 10 ||
        psw.length > 20) {
        return false
    } else {
        return true
    }
}


// * Setup thingy
const {
    json
} = require('express/lib/response')
const credential = new Datastore({
    filename: path.join(localChat, '/Server/Database/credential.db')
})
const message = new Datastore({
    filename: path.join(localChat, '/Server/Database/message.db')
})
const app = express()


// * File management
app.use(express.static(localChat))
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


// ! TESTING PURPOSE
app.get('/users', (req, res) => {
    credential.find({ name: "test"}, (err, doc) => {
        if (err !== null) {
            res.status(500).sendFile('/errorHandling/error 500.html', {
                root: path.join(localChat, './App/Html/')
            })
            console.error(`Database error "credential": ${err}`)
        } else {
            // TODO COMPARARE CON UN ARRAY VUOTO
            doc === [] ? res.send("empty") : res.send("ok")
        }
    })
})

app.post('/user', async (req, res) => {
    try {
        if (req.body.name === undefined ||
            req.body.password === undefined ||
            !validPassword(req.body.password)) {
            res.status(400).sendFile('/errorHandling/error 400.html', {
                root: path.join(localChat, './App/Html/')
            })
        } else if (credential.find({ name: req.body.name }, (err, doc) => {
                if (err !== null) {
                    res.status(500).sendFile('/errorHandling/error 500.html', {
                        root: path.join(localChat, './App/Html/')
                    })
                    console.error(`Database error "credential": ${err}`)
                } else {
                    // TODO FIXING THE DOC null or undefined?
                    if (doc === undefined) {
                        return false
                    } else {
                        return true
                    }
                }
            })) {
            res.status(409).sendFile('/errorHandling/error 409.html', {
                root: path.join(localChat, './App/Html/')
            })
            
        } else {

            let user = {
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                time: Date.now()
            }

            credential.insert(user, (err, newDoc) => {
                if (err !== null) {
                    res.status(500).sendFile('/errorHandling/error 500.html', {
                        root: path.join(localChat, './App/Html/')
                    })
                } else {
                    res.status(201).send()
                    console.log(`New user: ${JSON.stringify(newDoc)}`)
                }

            })
        }

    } catch {
        res.status(500).sendFile('/errorHandling/error 500.html', {
            root: path.join(localChat, './App/Html/')
        })
    }

})

app.post("/user/login", (req, res) => {
    credential.find({
        name: req.body.name
    }, async (err, doc) => {
        if (err !== null) {
            res.status(500).sendFile('/errorHandling/error 500.html', {
                root: path.join(localChat, './App/Html/')
            })
            console.error(`Database error "credential": ${err}`)
        } else {

            // TODO FIXING THE DOC null or undefined?
            if (doc === null) {
                res.status(400).sendFile('/errorHandling/error 400.html', {
                    root: path.join(localChat, './App/Html/')
                })
            } else {
                console.log(doc)
                try {
                    await bcrypt.compare(req.body.password, doc[0].password) ? res.send(doc[0]._id) :
                        res.status(401).sendFile('/errorHandling/error 401.html', {
                            root: path.join(localChat, './App/Html')
                        })

                } catch {
                    res.status(500).sendFile('/errorHandling/error 500.html', {
                        root: path.join(localChat, './App/Html/')
                    })
                }

            }
        }
    })

})





























// * Front page
app.get('/', (req, res) => {
    console.log(`${req.headers['x-forwarded-for'] || req.connection.remoteAddress} logged`)
    res.sendFile('Home.html', {
        root: path.join(localChat, './App/Html')
    })
})


// * Get method
// // app.get('/chat/:id', (req, res) => {
// //     req.params.id === '' ?
// //         res.sendFile('/errorHandling/error 401.html', {
// //             root: path.join(localChat, './App/Html')
// //         }) :

// //         res.sendFile('Chat.html', {
// //             root: path.join(localChat, './App/Html')
// //         })
// // })

app.get('/register', (req, res) => {
    res.sendFile('Register.html', {
        root: path.join(localChat, './App/Html')
    })
})




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
// //         root: path.join(localChat, './App/Html/')
// //     })
// // })

app.get('*', (req, res) => {
    res.status(404).sendFile('/errorHandling/error 404.html', {
        root: path.join(localChat, './App/Html/')
    })
})