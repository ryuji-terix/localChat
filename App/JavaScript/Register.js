const form = document.getElementById("login_form");

// form.addEventListener("submit",
// async function sendCredential(event) {
//     event.preventDefault();

//     const data = {
//         user: form.elements["name"].value,
//         password: form.elements["password"].value
//     };

//     console.log(data)

//     const options = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     };

//     const response = await fetch("/user", options);
//     const json = await response.json();

//     await Promise.resolve(console.log(json);)
// })


// form.addEventListener("submit",
// sendCredential = (event) => {
//     event.preventDefault();

//     const data = {
//         user: form.elements["name"].value,
//         password: form.elements["password"].value
//     };

//     console.log(data)

//     const options = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     };

//     fetch("/user", options)
//     .then (response => response.json())
//     .then (data => console.log(data))

// })