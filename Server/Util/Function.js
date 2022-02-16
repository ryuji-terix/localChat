// * Importing lib
const Datastore = require('nedb')
const path = require('path')
const ip = require('ip')


// * Declaring const
const localChatDir = path.dirname(path.dirname((__dirname)))
const message = new Datastore({ filename: path.join(localChatDir, '/Server/Util/message.db') })


// ? Random function
exports.localChatDir = () => {
    return localChatDir
}

exports.IP = (param) => {
    if (param === "ip") {
        return ip.address()

    } else if (param === "port") {
        return 25565

    } else {
        return `${this.IP("ip")}:${this.IP("port")}`

    }

}

exports.isArrEqual = (arr1, arr2) => {
    return arr1.length === arr2.length &&
    arr1.every((value, index) =>
    value === arr2[index])
}

// ? Database stuff
exports.initDb = () => {
    message.loadDatabase()
}

exports.newMessage = (msg) => {
    message.insert(msg, (err, newDoc) => {
        if (err !== null) {
            console.log(`Database encountered an error: /n ${err}`)
            
        } else {
            
            
        }
    })
}
