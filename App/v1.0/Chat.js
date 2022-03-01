const container = document.getElementById('msg_container')
const user = document.getElementById('username')
const inp = document.getElementById('input')
const btn = document.getElementById('btn')
const socket = io()

var Username = socket.connected ? Username = socket.id.substring(0,2) : Username = undefined


document.querySelector('button').onclick = () => {
    emitMsg()
}

onkeydown = (key) => {
    key.key === 'Enter' ? emitMsg() : ''
}

emitMsg = () => {
    let text = inp.value

    if (text.length !== 0 && text.trim().length !== 0) {
        socket.emit('message', text.trim())
    }

    // console.table( {length: text.length, trim: text.trim(), triml: text.trim().length});
    
    inp.value = ''
}

window.onload = () => {
    console.log(inp);
    getMessage((msg) => msg.forEach(el => addMessage(el)))
    setUser()
}



// <li class="msg">
//     <p class="msg_author">Teo</p>
//     <p class="msg_body">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum natus autem consectetur. Sequi, optio cupiditate dignissimos dolor quisquam quis. Iusto obcaecati ratione inventore quam perferendis sed expedita! Placeat, quis consectetur?</p>
//     <p class="msg_time"> 15:25</p>
// </li>

socket.on('message', text => addMessage(text))

addMessage = msg => {    
    let msg_author = document.createElement('p')
    msg_author.classList.add('msg_author')
    msg_author.innerText = msg.author
    
    let msg_body = document.createElement('p')
    msg_body.classList.add('msg_body')
    msg_body.innerText = msg.msg
    
    let msg_time = document.createElement('p')
    msg_time.classList.add('msg_time')
    let time = new Date(msg.time)
    msg_time.innerText = `${time.getHours().toString()}:${time.getMinutes().toString()}`
    
    let msg_li = document.createElement('li')
    msg_li.classList.add('msg')
    msg_li.appendChild(msg_author)
    msg_li.appendChild(msg_body)
    msg_li.appendChild(msg_time)
    
    container.appendChild(msg_li)
    window.scrollBy(0, 250);
}

async function getMessage (callback) {
    let msg = await fetch('/msg')
    callback(await msg.json())
}

setUser = () => {
    user.innerText = Username
}

socket.on('connect', () => {
    Username = socket.id.substring(0,3)
    setUser()
})