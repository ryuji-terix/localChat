// * Importing lib
const path = require('path')

// * Declaring const
const localChatDir = path.dirname(path.dirname((__dirname)))


exports.localChatDir = () => {
    return localChatDir
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
    credential.find({ param }, (err, doc) => {
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