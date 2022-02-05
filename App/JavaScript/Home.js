const l_c = document.getElementById("login_container");
const l_d = document.getElementById("login_div");

l_c.addEventListener("click", () => {
    togglePopup();
})

togglePopup = (admin) => {
    // if (admin) {
    //     console.log("admin");

    // } else {
    //     console.log("povero stolto");

    // }
    
    if (l_c.style.display === "none") {
        l_d.style.display = "flex";
        l_c.style.display = "block";

    } else {
        l_d.style.display = "none";
        l_c.style.display = "none";
    }


}



