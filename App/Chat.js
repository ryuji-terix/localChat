const socket = new WebSocket("ws://localhost:25565")

socket.onmessage = ({ data }) => {
    console.log("Message from server", data)
};

document.querySelector("button").onclick = () => {
    socket.send("hello");
}