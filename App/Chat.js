const container = document.getElementById('msg_container')
const user = document.getElementById('username')
const inp = document.getElementById('input')
const btn = document.getElementById('btn')
const socket = io()


document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value
    socket.emit('message', text)
    
}

window.onload = () => {
    console.log("set up")
}

socket.on('message', text => addMessage(text))

addMessage = msg => {
    console.table(msg)

    // <li class="msg">
    //     <p class="msg_author">Teo</p>
    //     <p class="msg_body">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum natus autem consectetur. Sequi, optio cupiditate dignissimos dolor quisquam quis. Iusto obcaecati ratione inventore quam perferendis sed expedita! Placeat, quis consectetur?</p>
    //     <p class="msg_time"> 15:25</p>
    // </li>
    
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