const l_c = document.getElementById("login_container");
const form = document.getElementById("login_form");
const main = document.getElementById("main");
const psw_label = document.getElementById("login_password_label");
const psw_login = document.getElementById("login_password");
const name_login = document.getElementById("login_name");
const subimt = document.getElementById("submit");
const error = document.getElementById("error_login");
var admin = false;

l_c.addEventListener("click", () => {
    togglePopup();
})


togglePopup = (admin) => {
    if (admin) {
        psw_label.style.display = "block";
        psw_login.style.display = "block";
        form.classList.remove("limit");

        psw_login.setAttribute("required", "");
        var admin = true;
    } else {
        psw_label.style.display = "none";
        psw_login.style.display = "none";
        form.classList.add("limit");

        psw_login.removeAttribute("required");
        var admin = false;
    }

    if (l_c.style.display === "none") {
        form.style.display = "flex";
        l_c.style.display = "block";
        main.style.display = "none";

    } else {
        form.style.display = "none";
        l_c.style.display = "none";
        main.style.display = "flex";
    }
}

form.addEventListener("submit",
    async function sendCredential(event) {
        event.preventDefault();

        userN = form.elements["name"].value
        userP = form.elements["password"].value

        const data = {
            user: userN,
            password: userP,
            time: Date.now(),
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch("/login", options);
        const json = await response.json();

        console.log(json);
        // await Promise.resolve()
    }
)
