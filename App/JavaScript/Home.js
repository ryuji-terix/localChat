joinChat = () => {
    window.location.href = "/chat";
}

togglePopup = () => {
    const popup = document.getElementsByClassName("displayPopup");
    console.log("premuto")
    popup.style.display = "none" ?
    popup.style.display = "block" :
    popup.style.display = "none";
}