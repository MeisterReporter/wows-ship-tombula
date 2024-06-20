function chooseRandom(self) {
    self.setAttribute("disabled", null);
    var random = getRandomIndex();
    // Check for possible issues
    if (random === -1) {
        alert("Generation of a Random ship failed. Please contact the administrator.");
    }
    var ship = shipData[random];
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
        if (Math.random() < 0.5 && !selectedShown || i == 7) {
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

function getRandomIndex() {
    // Get Class weights
    /*var classCounts = [];
    for (let i = 0; i < shipData.length; i++) {
        if (shipData[i].type in classCounts) {
            classCounts[shipData[i].type]++;
        } else {
            classCounts[shipData[i].type] = 1;
        }
    }
    var classWights = [];
    for (const [key, value] of Object.entries(classCounts)) {
        classWights[key] = value / shipData.length;
    }*/

    // Get Selectable Indices
    var pool = [];
    var weights = [];
    for (let i = 0; i < shipData.length; i++) {
        if (selectedItems[shipData[i].name]) {
            pool.push(i);
            weights.push(1 / shipData.length);
        }
    }

    // Weighted Index choice
    const totalWeight = weights.reduce((x, y) => x + y);
    const val = Math.random() * totalWeight;
    var index = -1;
    for (let i = 0, cur = 0; true; i++) {
        cur += weights[i];
        if (val <= cur) {
            index = i;
            break;
        }
    }

    return pool[index];
}