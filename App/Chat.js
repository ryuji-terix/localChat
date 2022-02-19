const container = document.getElementById('msg_container')
const user = document.getElementById('username')
const inp = document.getElementById('input')
const btn = document.getElementById('btn')

const socket = io()

socket.on('message', text => addMessage(text))

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value
    socket.emit('message', text)

}


addMessage = msg => {
    console.table(msg)
    
    let msg_author = document.createElement('p')
    msg_author.classList.add('msg_author')
    msg_author.innerText = msg.author

    let msg_body = document.createElement('p')
    msg_body.classList.add('msg_body')
    msg_body.innerText = msg.msg

    let msg_time = document.createElement('p')
    msg_time.classList.add('msg_time')
    msg_time.innerText = new Date(msg.time).getTime()

    let msg_li = document.createElement('li')
    msg_li.classList.add('msg')
    msg_li.appendChild(msg_author)
    msg_li.appendChild(msg_body)
    msg_li.appendChild(msg_time)
    
    container.appendChild(msg_li)
}