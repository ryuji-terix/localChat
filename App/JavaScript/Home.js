const l_c = document.getElementById("login_container");
const form = document.getElementById("login_form");
const main = document.getElementById("main");
const psw_label = document.getElementById("login_password_label");
const psw_login = document.getElementById("login_password");
const subimt = document.getElementById("submit");
const error = document.getElementById("error_login");

l_c.addEventListener("click", () => {
    togglePopup();
})

togglePopup = (register) => {
    register === true ? window.location.href = "/register" : ""

    if (l_c.style.display === "none") {
        form.style.display = "flex";
        l_c.style.display = "block";
        main.style.display = "none";

    } else {
        form.style.display = "none";
        l_c.style.display = "none";
        main.style.display = "flex";

        for (let index = 0; index < form.elements.length; index++) {
            form.elements[index].value = "";
        }

    }
}

// TODO: request for login
form.addEventListener("submit",
    async function sendCredential(event) {
        event.preventDefault();

        const data = {
            user: form.elements["name"].value,
            password: form.elements["password"].value
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch("/user/login", options);
        console.log(await response);

        // await Promise.resolve()
    }
)