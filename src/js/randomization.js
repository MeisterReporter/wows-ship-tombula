function chooseRandom(self) {
    self.setAttribute("disabled", null);
    var random = Math.floor(Math.random() * shipData.length);
    var ship = shipData[random];
    if (!selectedItems[ship.name]) {
        while (!selectedItems[ship.name]) {
            random = (random + 1) % shipData.length;
            ship = shipData[random];
        }
    }
    var ticket = document.getElementsByClassName("ship-ticket")[0];
    var randomize = document.getElementsByClassName("randomize")[0];
    var tombula = randomize.getElementsByClassName("tombola")[0];
    // Show the Tombula
    randomize.removeAttribute("stop");
    tombula.style["transition"] = "5s ease-in transform";
    tombula.style["transform"] = "rotateX(3000deg) translateZ(-480px)";
    // Set the images randomly
    var selectedShown = false;
    for (let i = 0; i < 8; i++) {
        var img = tombula.getElementsByTagName("img")[i];
        if (Math.random() < 0.5 || (!selectedShown && i == 7)) {
            img.src = shipData[random].image;
            selectedShown = true;
        } else {
            var imageRandom = Math.floor(Math.random() * shipData.length);
            img.src = shipData[imageRandom].image;
        }
    }
    // Hide the Ticket
    ticket.setAttribute("hidden", null);
    document.getElementById("instruction").style["display"] = "none";
    // Fill the Canvas
    var canvas = document.getElementsByClassName("ticket-canvas")[0];
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    ctx.rect(0, 0, 560, 320);
    ctx.fillStyle = "goldenrod";
    ctx.fill();
    // Update the Content
    var shipImage = ticket.getElementsByClassName("ship-image")[0];
    var flag = ticket.getElementsByClassName("flag")[0];
    var tier = ticket.getElementsByClassName("tier")[0];
    var clazz = ticket.getElementsByClassName("class")[0];
    var name = ticket.getElementsByClassName("name")[0];
    shipImage.src = ship.image;
    name.innerHTML = ship.name;
    clazz.innerHTML = ship.type;
    tier.innerHTML = ship.tier;
    flag.src = "src/img/flag_" + ship.faction + ".png";
    // Show the Ticket
    setTimeout((button) => {
        var ticket = document.getElementsByClassName("ship-ticket")[0];
        ticket.removeAttribute("hidden");
        document.getElementById("instruction").style["display"] = "";
        var randomize = document.getElementsByClassName("randomize")[0];
        randomize.setAttribute("stop", null);
        button.removeAttribute("disabled");
        setTimeout(() => {
            var tombula = randomize.getElementsByClassName("tombola")[0];
            tombula.style["transition"] = "";
            tombula.style["transform"] = "rotateX(0deg) translateZ(-480px)";
        }, 500);
    }, 3000, self);
}