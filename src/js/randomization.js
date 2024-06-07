function chooseRandom() {
    var random = Math.floor(Math.random() * shipData.length);
    var ship = shipData[random];
    if (selectedItems[ship.name]) {
        // Fill the Canvas
        var canvas = document.getElementsByClassName("ticket-canvas")[0];
        const ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "source-over";
        ctx.rect(0, 0, 560, 320);
        ctx.fillStyle = "goldenrod";
        ctx.fill();
        // Show the Ticket
        var ticket = document.getElementsByClassName("ship-ticket")[0];
        ticket.style["display"] = "";
        document.getElementById("instruction").style["display"] = "";
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
    } else {
        chooseRandom();
    }
}