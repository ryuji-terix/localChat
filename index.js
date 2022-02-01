const express = require("express")
const ip = require("ip")

const { json } = require("express/lib/response")
const app = express()

// "localhost"
const IPv4 = ip.address()
const port = 8080
const IP = IPv4

app.listen(port, IP, () => {
    console.log(`Chat aperta su ${IP}:${port}`)
})

app.use(express.static("public"))
app.use(express.json());

app.get('/', function(req, res) {
    res.send('hello world');
  });

app.post("/ip", (req, res) => {
    const data = req
    console.log(`A new user logged in ${req}`);
    console.log(data);
    res.json({
        status: "success",
        latitude: data.lat,
        longitude: data.long
    });
});