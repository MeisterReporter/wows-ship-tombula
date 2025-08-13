var classes = ["SS", "DD", "CL", "CA", "BC", "BB", "CV"];
var classDraws = {"SS": 0, "DD": 0, "CL": 0, "CA": 0, "BC": 0, "BB": 0, "CV": 0};
var tierDraws = {"I": 0, "II": 0, "III": 0, "IV": 0, "V": 0, "VI": 0, "VII": 0, "VIII": 0, "IX": 0, "X": 0, "★": 0};

var lastDrawnShip = null;

var enableAprilFools = false;
var firstFoolShip = "Umikaze";
var foolShips = [
    "Tiger '59",
    "Auckland",
    "Gibraltar",
    "U-4501",
    "Alliance",
    "Gneisenau",
    "Riga",
    "Francesco Caracciolo",
    "Attilio Regolo",
    "Paolo Emilio",
    "Hector",
    "Archerfish",
    "Manfred von Richthofen",
    "Graf Zeppelin",
    "Schill",
    "Karl von Schönberg",
    "Canarias",
    "Lugdunum",
    "Stord '43",
    "Picardie",
    "Tashkent '39",
    "Ragnar",
    "Shinonome",
    "Michelangelo",
    "Navarin",
    "Seattle",
    "Takahashi",
    "Luca Tarigo",
    "Adriatico",
    "Xin Zhong Guo 14",
    "Dalian",
    "Omaha",
    "Kitakami",
]

function chooseRandom(self) {
    confettiFired = false;
    if (self.hasAttribute("disabled")) return;
    self.setAttribute("disabled", null);
    var random = enableAprilFools ? findAprilShipIndex() : getRandomIndex();
    // Check for possible issues
    if (random === -1) {
        alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
        return;
    }
    var ship = shipData[random];
    lastDrawnShip = ship;
    // Change Diddn Image if required
    if (ship.type == "SS") {
        changeDiddnImage("src/img/depri_krado_1.png", "src/img/depri_krado_2.png");
    } else {
        changeDiddnImage("src/img/didden_01.png", "src/img/didden_02.png");
    }
    // Increase draw counts
    classDraws[ship.type] += 1;
    tierDraws[ship.tier] += 1;
    // Increase ship draw count
    var pName = "p" + ship.name;
    var p = localStorage.getItem(pName);
    if (p !== null) {
        localStorage.setItem(pName, parseInt(p) + 1);
    } else {
        localStorage.setItem(pName, 1);
    }
    var currentSkin = localStorage.getItem("skin") || "default";
    if (currentSkin === "default") {
        // Get Components
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
            if ((Math.random() < 0.5 && !selectedShown) || (i == 7 && !selectedShown)) {
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
        if (ship.premium === "true") {
            name.classList.add("premium");
        } else {
            name.classList.remove("premium");
        }
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
    } else {
        if (typeof skinRandomize !== "undefined") {
            skinRandomize(ship);
        } else {
            console.error("No skin randomization function defined for skin: " + currentSkin);
        }
    }
    if (localStorage.getItem("totalTombolaThrows") === null) {
        localStorage.setItem("totalTombolaThrows", 0);
    }
    localStorage.setItem("totalTombolaThrows", parseInt(localStorage.getItem("totalTombolaThrows")) + 1);
    // Check if the april fool is over
    if (enableAprilFools) {
        checkIfFoolIsOver();
    }
}

function getRandomIndex(allowedClasses = ["SS", "DD", "CL", "CA", "BC", "BB", "CV"], disallowedShips = [], allowedShips = []) {
    // Get Class weights
    var classWeights = [];
    for (let i = 0; i < classes.length; i++) {
        var type = classes[i];
        var draws = classDraws[type];
        classWeights[type] = weightByCount(draws, Math.max(getTotalValueOfObject(classDraws), 2));
    }
    // console.log(classWeights);
    // Get Tier weights
    var tierWeights = [];
    for (let i = 0; i < Object.keys(tierDraws).length; i++) {
        var tier = Object.keys(tierDraws)[i];
        var draws = tierDraws[tier];
        tierWeights[tier] = weightByCount(draws, Math.max(getTotalValueOfObject(tierDraws), 2));
    }
    // console.log(tierWeights);

    // Get Selectable Indices
    var pool = [];
    var weights = [];
    for (let i = 0; i < shipData.length; i++) {
        if (selectedItems[shipData[i].name] && allowedClasses.includes(shipData[i].type) && !disallowedShips.includes(shipData[i].name)
            && (allowedShips.length <= 0 || allowedShips.includes(shipData[i].name))) {
            // Add Index
            pool.push(i);
            // Get ship debuff
            var p = 0;
            if (localStorage.getItem("p" + shipData.name) !== null) {
                p = parseInt(localStorage.getItem("p" + shipData.name));
            }
            var shipDebuff = -Math.max(weightByCount2(p, Math.max(getMaximumShipDraws(), 2)), 0);
            // Calculate & push weights
            weights.push(classWeights[shipData[i].type] + tierWeights[shipData[i].tier] + shipDebuff);
        }
    }

    // Weighted Index choice
    if (weights.length <= 0) {
        return -1;
    }
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

function weightByCount(count, max = 100) {
    var value = 1 - (Math.log(count) / Math.log(max));
    return Math.min(Math.max(value, 0), max);
}

function weightByCount2(count, max = 100) {
    var value = (Math.log(count) / Math.log(max)) + 1;
    return Math.min(Math.max(value, 0), max);
}

function getTotalValueOfObject(obj) {
    var total = 0;
    for (let i = 0; i < Object.values(obj).length; i++) {
        total += Object.values(obj)[i];
    }
    return total;
}

function getMaximumShipDraws() {
    var maximum = 0;
    for (let i = 0; i < shipData.length; i++) {
        var name = "p" + shipData[i].name;
        var p = localStorage.getItem(name);
        if (p !== null && parseInt(p) > maximum) {
            maximum = parseInt(p);
        }
    }
    return maximum;
}

function findAprilShipIndex() {
    // Load values out of storage
    var firstFool = localStorage.getItem("FirstFoolShip");
    if (firstFool === null) {
        firstFool = false;
    } else {
        firstFool = firstFool === "true";
    }
    var aprilFoolShips = localStorage.getItem("AprilFoolShips");
    if (aprilFoolShips !== null) {
        aprilFoolShips = JSON.parse(aprilFoolShips);
    }

    const availableShips = foolShips.filter(ship => !aprilFoolShips || !aprilFoolShips.includes(ship));
    // If the april fool has been played through, return to normal behavior
    if (availableShips.length <= 0) {
        return getRandomIndex();
    }
    // Find a random fool ship
    const randomName = firstFool ? availableShips[Math.floor(Math.random() * availableShips.length)] : firstFoolShip;
    for (let index = 0; index < shipData.length; index++) {
        const element = shipData[index];
        if (randomName == element.name) {
            if (!firstFool) localStorage.setItem("FirstFoolShip", true);
            if (aprilFoolShips !== null) {
                aprilFoolShips.push(randomName);
            } else {
                aprilFoolShips = [randomName];
            }
            localStorage.setItem("AprilFoolShips", JSON.stringify(aprilFoolShips));
            return index;
        }
    }
}

function hasAprilFoolShipsLeft() {
    var aprilFoolShips = localStorage.getItem("AprilFoolShips");
    if (aprilFoolShips !== null) {
        aprilFoolShips = JSON.parse(aprilFoolShips);
    }
    return foolShips.filter(ship => !aprilFoolShips || !aprilFoolShips.includes(ship)).length > 0;
}

function checkIfFoolIsOver() {
    var shipListElement = document.getElementsByClassName("ship-list")[0];
    if (hasAprilFoolShipsLeft() && enableAprilFools) {
        for (let i = 0; i < shipListElement.children.length; i++) {
            const element = shipListElement.children[i];
            element.setAttribute("hidden", null);
        }
        var foolElement = document.getElementsByClassName("april-fool")[0];
        foolElement.removeAttribute("hidden");
        return false;
    } else {
        for (let i = 0; i < shipListElement.children.length; i++) {
            const element = shipListElement.children[i];
            element.removeAttribute("hidden");
        }
        var foolElement = document.getElementsByClassName("april-fool")[0];
        foolElement.setAttribute("hidden", null);
        return true;
    }
}

function checkShipNames(shipNames) {
    var foundShips = 0;
    // Find random message
    for (let i = 0; i < shipNames.length; i++) {
        var shipName = shipNames[i];
        // Find ship
        for (let j = 0; j < shipData.length; j++) {
            const element = shipData[j];
            if (shipName == element.name) {
                foundShips++;
                continue;
            }
        }
    }
    console.log("Found " + foundShips + " ships of " + shipNames.length + ".");
}

function isZonk(ship = lastDrawnShip) {
    return ship.type == "SS" || ship.type == "CV" || foolShips.includes(ship.name);
}