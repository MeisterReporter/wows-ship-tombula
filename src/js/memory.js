let turnedCards = 0;
let allowTurningCards = false;
let card1 = null;
let card2 = null;
let lastTwoCards = [];
let cheatTrys = 0;

function distributeCards() {
    if (!hasEnoughShips()) return;
    var instruction = document.getElementById("instruction");
    applyLocalizationTo(instruction, "key.memorize", false);
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
    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            const elements = memoryField.children[i];
            for (let j = 0; j < 4; j++) {
                const element = elements.children[j];
                const randomIndex = Math.floor(Math.random() * selectedShipIndecies.length);
                element.children[0].src = shipData[selectedShipIndecies[randomIndex]].image;
                element.children[0].setAttribute("index", selectedShipIndecies[randomIndex].toString());
                selectedShipIndecies.splice(randomIndex, 1);
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
            }
        }
    }, 2000);
}

function showMemoryCard(self, fromOnClick = true) {
    if (self !== null && self.hasAttribute("hidden") && ((fromOnClick && allowTurningCards) || !fromOnClick)) {
        turnCard();
        self.removeAttribute("hidden");
        if (fromOnClick) {
            turnedCards++;
            checkEquality(self);
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