let turnedCards = 0;
let allowTurningCards = false;
let card1 = null;
let card2 = null;
let lastTwoCards = [];
let cheatTrys = 0;
let timeoutTrys = 0;

var memorize = false;
var showNames = false;

var timeout = false;

var BadShips = [
    "Tiger '59",
    "Auckland",
    "Umikaze",
    "Moskva",
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
    "Franklin D. Roosevelt",
    "Manfred von Richthofen",
    "Graf Zeppelin",
    "Schill",
    "Karl von Schönberg",
    "Canarias",
    "Svea",
    "Lugdunum",
    "Stord '43",
    "Picardie",
    "Tashkent '39",
]

function distributeCards() {
    if (!hasEnoughShips()) return;
    var instruction = document.getElementById("instruction");
    if (memorize) applyLocalizationTo(instruction, "key.memorize", false);
    var selectedShips = [];
    var selectedShipIndecies = [];
    for (let i = 0; i < 8; i++) {
        var shipIndex = getRandomIndex(["SS", "DD", "CL", "CA", "BC", "BB", "CV"], selectedShips);
        var shipName = shipData[shipIndex].name;
        selectedShips.push(shipName);
        selectedShipIndecies.push(shipIndex);
        selectedShipIndecies.push(shipIndex);
    }
    var memoryField = document.getElementById("memory-field");
    memoryField.style["display"] = "";
    for (let i = 0; i < 4; i++) {
        const elements = memoryField.children[i];
        for (let j = 0; j < 4; j++) {
            const element = elements.children[j];
            hideMemoryCard(element);
        }
    }
    setTimeout(() => {
        lastTwoCards = [];
        for (let i = 0; i < 4; i++) {
            const elements = memoryField.children[i];
            for (let j = 0; j < 4; j++) {
                const element = elements.children[j];
                const randomIndex = Math.floor(Math.random() * selectedShipIndecies.length);
                element.children[0].src = shipData[selectedShipIndecies[randomIndex]].image;
                element.children[0].setAttribute("index", selectedShipIndecies[randomIndex].toString());
                element.children[1].innerText = showNames ? shipData[selectedShipIndecies[randomIndex]].name : "";
                if (!showNames) {
                    element.children[1].setAttribute("hidden", null);
                    element.children[0].style["margin-bottom"] = "auto";
                } else {
                    element.children[1].removeAttribute("hidden");
                    element.children[0].style["margin-bottom"] = null;
                }
                selectedShipIndecies.splice(randomIndex, 1);
                if (memorize) {
                    setTimeout(() => {
                        showMemoryCard(element, false);
                        setTimeout(() => {
                            hideMemoryCard(element, false);
                            if (i == 3 && j == 3) {
                                turnedCards = 0;
                                allowTurningCards = true;
                                applyLocalizationTo(instruction, "key.pick_pairs_2", false);
                                const indicator = document.getElementById("memory-music");
                                if (indicator !== null) {
                                    indicator.setAttribute("play", null);
                                }
                                playMemoryMusic();
                            }
                        }, 2500);
                    }, 50 * i + 50 * j);
                } else if (i == 3 && j == 3) {
                    turnedCards = 0;
                    allowTurningCards = true;
                    applyLocalizationTo(instruction, "key.pick_pairs_2", false);
                    const indicator = document.getElementById("memory-music");
                    if (indicator !== null) {
                        indicator.setAttribute("play", null);
                    }
                    playMemoryMusic();
                }
            }
        }
    }, memorize ? 2000 : 0);
}

function showMemoryCard(self, fromOnClick = true) {
    if (self !== null && self.hasAttribute("hidden") && ((fromOnClick && allowTurningCards) || !fromOnClick)) {
        if (!timeout) {
            turnCard();
            self.removeAttribute("hidden");
            if (fromOnClick) {
                turnedCards++;
                checkEquality(self);
            }
        } else {
            timeoutTrys++;
            if (timeoutTrys > 2) {
                addDialog("key.dialog.timeout_penalty.title", "key.dialog.timeout_penalty.content", true, "key.button.ok");
                timeoutTrys = 0;
                setTimeout(() => {
                    const badShipIndex = findBadShip();
                    const ship = shipData[badShipIndex];
                    var flagPath = "src/img/flag_" + ship.faction + ".png";
                    var instruction = document.getElementById("instruction");
                    instruction.innerHTML = "<div class='singleline-ship-display'><p><span id='543789'></span><img class='flag large' src='" + flagPath +"'><span class='tier'>" + ship.tier + "</span><span class='class'>" + ship.type + "</span><span class='name'>" + ship.name + "</span></p></div>";
                }, 1000);
            }
            if (timeoutTrys > 0) {
                addDialog("key.dialog.timeout_warning.title", "key.dialog.timeout_warning.content", true, "key.button.ok");
            }
        }
    }
}

function hideMemoryCard(self) {
    if (self !== null && !self.hasAttribute("hidden")) {
        turnCard();
        self.setAttribute("hidden", null);
    }
}

function checkEquality(self) {
    if (card1 === null && turnedCards == 1) {
        card1 = self;
        if (lastTwoCards.includes(card1)) anticheat();
    }
    if (card2 === null && turnedCards == 2) card2 = self;
    if (turnedCards == 2) {
        if (card1.children[0].src == card2.children[0].src) {
            const copy1 = card1;
            const copy2 = card2;
            lastTwoCards = [];
            setTimeout(() => {
                const ship = shipData[parseInt(copy1.children[0].getAttribute("index"))];
                var flagPath = "src/img/flag_" + ship.faction + ".png";
                var instruction = document.getElementById("instruction");
                instruction.innerHTML = "<div class='singleline-ship-display'><p><span id='543789'></span><img class='flag large' src='" + flagPath +"'><span class='tier'>" + ship.tier + "</span><span class='class'>" + ship.type + "</span><span class='name'>" + ship.name + "</span></p></div>";
                if (isOver()) {
                    levelPassedSound();
                    const indicator = document.getElementById("memory-music");
                    if (indicator !== null) {
                        indicator.removeAttribute("play", null);
                    }
                    stopMemoryMusic();
                    applyLocalizationTo(document.getElementById("543789"), "key.memory_game_over", false);
                } else {
                    applyLocalizationTo(document.getElementById("543789"), "key.memory_ship_drawn", false);
                }
                copy1.setAttribute("success", null);
                copy2.setAttribute("success", null);
                correctSound();
                setTimeout(() => {
                    copy1.removeAttribute("success");
                    copy2.removeAttribute("success");
                }, 500);
            }, 1000);
        } else {
            const copy1 = card1;
            const copy2 = card2;
            lastTwoCards = [];
            lastTwoCards.push(copy1);
            lastTwoCards.push(copy2);
            setTimeout(() => {
                var instruction = document.getElementById("instruction");
                applyLocalizationTo(instruction, "key.memory_wrong_pair", false);
                copy1.setAttribute("fail", null);
                copy2.setAttribute("fail", null);
                setTimeout(() => {
                    copy1.removeAttribute("fail");
                    copy2.removeAttribute("fail");
                }, 500);
                wrongSound();
            }, 1000);
            setTimeout(() => {
                hideMemoryCard(copy1);
                hideMemoryCard(copy2);
            }, 2500);
        }
        card1 = null;
        card2 = null;
        turnedCards = 0;
        timeout = true;
        setTimeout(() => {
            timeout = false;
        }, 2000);
    }
}

function anticheat() {
    cheatTrys++;
    if (cheatTrys == 1) addDialog("key.do_not_cheat", "key.do_not_cheat_content", true, "key.button.understood");
    if (cheatTrys > 1) {
        addDialog("key.cheat_penalty", "key.cheat_penalty_content", true, "key.button.ok", () => distributeCards());
        cheatTrys = 0;
        card1 = null;
    }
}

function isOver() {
    var memoryField = document.getElementById("memory-field");
    for (let i = 0; i < 4; i++) {
        const elements = memoryField.children[i];
        for (let j = 0; j < 4; j++) {
            const element = elements.children[j];
            if (element.hasAttribute("hidden")) return false;
        }
    }

    return true;
}

function hasEnoughShips() {
    const hasEnough = countSelectedShips() >= 8;
    if (!hasEnough) {
        addDialog("key.dialog.not_enough_ships.title", "key.dialog.not_enough_ships.content", true, "key.button.ok");
    }
    return hasEnough;
}

function findBadShip() {
    const randomName = BadShips[Math.floor(Math.random() * BadShips.length)];
    for (let index = 0; index < shipData.length; index++) {
        const element = shipData[index];
        if (randomName == element.name) {
            return index;
        }
    }
}

//////////////
// Settings //
//////////////

function updateMemoryEnableMemorize(toggle, self) {
    toggle = JSON.parse(toggle);
    var display = document.getElementById("feedbackMemorize");
    if (display !== null) {
        if (toggle) {
            applyLocalizationTo(display, "key.turnedOn", true);
        } else {
            applyLocalizationTo(display, "key.turnedOff", true);
        }
    }
    if(self !== null) self.checked = toggle;

    localStorage.setItem("memorize", toggle);
    memorize = toggle;
}

function updateMemoryShowNames(toggle, self) {
    toggle = JSON.parse(toggle);
    var display = document.getElementById("feedbackMemoryShowNames");
    if (display !== null) {
        if (toggle) {
            applyLocalizationTo(display, "key.turnedOn", true);
        } else {
            applyLocalizationTo(display, "key.turnedOff", true);
        }
    }
    if(self !== null) self.checked = toggle;

    localStorage.setItem("memoryShowNames", toggle);
    showNames = toggle;
}

function delayedUpdateMemoryValues(delay) {
    setTimeout(() => {
        updateMemoryValues();
    }, delay);
}

function updateMemoryValues() {
    if (localStorage.getItem("memorize") !== null) {
        updateMemoryEnableMemorize(localStorage.getItem("memorize"), document.getElementById("memorize"));
    }
    if (localStorage.getItem("memoryShowNames") !== null) {
        updateMemoryShowNames(localStorage.getItem("memoryShowNames"), document.getElementById("memoryShowNames"));
    }
}