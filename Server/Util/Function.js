// * Importing lib
const Datastore = require('nedb')
const path = require('path')
const ip = require('ip')


// * Declaring const
const localChatDir = path.dirname(path.dirname((__dirname)))
const credential = new Datastore({ filename: path.join(localChatDir, '/Server/Database/credential.db') })
const message = new Datastore({ filename: path.join(localChatDir, '/Server/Database/message.db') })
require('dotenv').config({ path: path.join(localChatDir, '/Server/Util/.env') })


// ? Random function
exports.localChatDir = () => {
    return localChatDir
}

exports.IP = (param) => {
    if (param === "ip") {
        return ip.address()

    } else if (param === "port") {
        return process.env.PORT

    } else {
        return `${this.IP("ip")}:${this.IP("port")}`

    }

}

exports.validPassword = (psw) => {
    return psw.length < 10 || psw.length > 20 ? false : true
}

exports.isArrEqual = (arr1, arr2) => {
    return arr1.length === arr2.length &&
    arr1.every((value, index) =>
    value === arr2[index])
}

exports.isAdmin = (name) => {
    return name === process.env.ADMIN_USER1 ? true : false
}


// ? Database stuff
exports.initDb = () => {
    credential.loadDatabase()
    message.loadDatabase()
}

exports.newUser = (user) => {
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

exports.getUserby = (res, param) => {
    credential.find(param, (err, doc) => {
        if (err !== null) {
            func.statusExport(res, 500)
            console.error(`Database error "credential": ${err}`)

        } else {
            return doc
        }
    })

}


// ? Express stuff
exports.statusExport = (res, status) => {
    res.status(status).sendFile(`/errorHandling/error ${status}.html`, {
        root: path.join(localChatDir, './App/Html/')
    })
}

exports.sendFile = (res, name) => {
    res.sendFile(name, {
        root: './App/Html'
    })
}