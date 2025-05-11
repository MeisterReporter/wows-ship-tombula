var shipSet = [];
var alreadyShownThisSession = false;
var isRolling = false;

const RANDOM = "random";
const CLASS_SET = "classSet";
var rollTypeIndex = RANDOM;

const DAILY = "daily";
const RELOAD = "reload";
const THREE_THROWS = "threeThrows";
var rollFrequencyIndex = DAILY;

function showDailyDice(visisble) {
    var container = document.getElementById("dailyDiceArea");
    if (!visisble) {
        container.setAttribute("hidden", "");
    } else {
        container.removeAttribute("hidden")
    }
}

function selectRandomShips() {
    if (checkAvailability()) {
        shipSet = [];
        var randomShipsDrawn = localStorage.getItem("randomShipsDrawn") === "true";
        var subCard = document.getElementById("ssCard");
        var ddCard = document.getElementById("ddCard");
        var caCard = document.getElementById("caCard");
        var bcCard = document.getElementById("bcCard");
        var bbCard = document.getElementById("bbCard");
        var cvCard = document.getElementById("cvCard");
        if (!randomShipsDrawn) {
            // Sub
            var subIndex = getRandomIndex(rollTypeIndex == CLASS_SET ? ["SS"] : ["SS", "DD", "CL", "CA", "BC", "BB", "CV"]);
            if (subIndex == -1) subIndex = getRandomIndex();
            if (subIndex == -1) {
                alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
                return;
            }
            localStorage.setItem("randomShipsSS", subIndex);
            setContentToCard(subCard, shipData[subIndex]);
            // DD
            var ddIndex = getRandomIndex(rollTypeIndex == CLASS_SET ? ["DD"] : ["SS", "DD", "CL", "CA", "BC", "BB", "CV"]);
            if (ddIndex == -1) ddIndex = getRandomIndex();
            if (ddIndex == -1) {
                alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
                return;
            }
            localStorage.setItem("randomShipsDD", ddIndex);
            setContentToCard(ddCard, shipData[ddIndex]);
            // CL/CA
            var caIndex = getRandomIndex(rollTypeIndex == CLASS_SET ? ["CL", "CA"] : ["SS", "DD", "CL", "CA", "BC", "BB", "CV"]);
            if (caIndex == -1) caIndex = getRandomIndex();
            if (caIndex == -1) {
                alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
                return;
            }
            localStorage.setItem("randomShipsCA", caIndex);
            setContentToCard(caCard, shipData[caIndex]);
            // BC
            var bcIndex = getRandomIndex(rollTypeIndex == CLASS_SET ? ["BC"] : ["SS", "DD", "CL", "CA", "BC", "BB", "CV"]);
            if (bcIndex == -1) bcIndex = getRandomIndex();
            if (bcIndex == -1) {
                alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
                return;
            }
            localStorage.setItem("randomShipsBC", bcIndex);
            setContentToCard(bcCard, shipData[bcIndex]);
            // BB
            var bbIndex = getRandomIndex(rollTypeIndex == CLASS_SET ? ["BB"] : ["SS", "DD", "CL", "CA", "BC", "BB", "CV"]);
            if (bbIndex == -1) bbIndex = getRandomIndex();
            if (bbIndex == -1) {
                alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
                return;
            }
            localStorage.setItem("randomShipsBB", bbIndex);
            setContentToCard(bbCard, shipData[bbIndex]);
            // CV
            var cvIndex = getRandomIndex(rollTypeIndex == CLASS_SET ? ["CV"] : ["SS", "DD", "CL", "CA", "BC", "BB", "CV"]);
            if (cvIndex == -1) cvIndex = getRandomIndex();
            if (cvIndex == -1) {
                alert("Generation of a Random ship failed. Please check if you have selected at least one Ship.");
                return;
            }
            localStorage.setItem("randomShipsCV", cvIndex);
            setContentToCard(cvCard, shipData[cvIndex]);
            shipSet.push(subIndex, ddIndex, caIndex, bcIndex, bbIndex, cvIndex);
        } else {
            // Sub
            setContentToCard(subCard, shipData[localStorage.getItem("randomShipsSS")]);
            // DD
            setContentToCard(ddCard, shipData[localStorage.getItem("randomShipsDD")]);
            // CL/CA
            setContentToCard(caCard, shipData[localStorage.getItem("randomShipsCA")]);
            // BC
            setContentToCard(bcCard, shipData[localStorage.getItem("randomShipsBC")]);
            // BB
            setContentToCard(bbCard, shipData[localStorage.getItem("randomShipsBB")]);
            // CV
            setContentToCard(cvCard, shipData[localStorage.getItem("randomShipsCV")]);
            shipSet.push(parseInt(localStorage.getItem("randomShipsSS")), parseInt(localStorage.getItem("randomShipsDD")), parseInt(localStorage.getItem("randomShipsCA")), parseInt(localStorage.getItem("randomShipsBC")), parseInt(localStorage.getItem("randomShipsBB")), parseInt(localStorage.getItem("randomShipsCV")));
        }

        localStorage.setItem("randomShipsDrawn", true);

        // Animate
        const timeoutMs = 300;
        setTimeout(() => {
            subCard.removeAttribute("hidden");
            subCard.removeAttribute("chosen");
            if (!subCard.hasAttribute("animate")) spreadCards();
            subCard.setAttribute("animate", "");
            setTimeout(() => {
                ddCard.removeAttribute("hidden");
                ddCard.removeAttribute("chosen");
                if (!ddCard.hasAttribute("animate")) spreadCards();
                ddCard.setAttribute("animate", "");
                setTimeout(() => {
                    caCard.removeAttribute("hidden");
                    caCard.removeAttribute("chosen");
                    if (!caCard.hasAttribute("animate")) spreadCards();
                    caCard.setAttribute("animate", "");
                    setTimeout(() => {
                        bcCard.removeAttribute("hidden");
                        bcCard.removeAttribute("chosen");
                        if (!bcCard.hasAttribute("animate")) spreadCards();
                        bcCard.setAttribute("animate", "");
                        setTimeout(() => {
                            bbCard.removeAttribute("hidden");
                            bbCard.removeAttribute("chosen");
                            if (!bbCard.hasAttribute("animate")) spreadCards();
                            bbCard.setAttribute("animate", "");
                            setTimeout(() => {
                                cvCard.removeAttribute("hidden");
                                cvCard.removeAttribute("chosen");
                                if (!cvCard.hasAttribute("animate")) spreadCards();
                                cvCard.setAttribute("animate", "");
                            }, timeoutMs);
                        }, timeoutMs);
                    }, timeoutMs);
                }, timeoutMs);
            }, timeoutMs);
        }, timeoutMs);
    }
}

function setContentToCard(card, ship) {
    if (ship === null) return;
    var shipImage = card.getElementsByClassName("ship-image")[0];
    var flag = card.getElementsByClassName("flag")[0];
    var tier = card.getElementsByClassName("tier")[0];
    var clazz = card.getElementsByClassName("class")[0];
    var name = card.getElementsByClassName("name")[0];
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
}

const diceRotations = {
    1: [0, 0],
    2: [0, 180],
    3: [0, -90],
    4: [0, 90],
    5: [-90, 90],
    6: [90, 90]
};

function rollTheDice() {
    // This code snippet would prevent re-rolls
    /*if (!checkAvailability()) {
        return;
    }*/
    if (isRolling) {
        return;
    }
    isRolling = true;
    dailyRollUsed();
    isDailyDiceAvailable();

    var cube = document.getElementById('cube');

    cube.style.transform = 'rotateX(1000deg) rotateY(1000deg)';

    // Random result between 1 and 6
    var result = Math.min(Math.floor(Math.random() * 6) + 1, 6);

    var ship = shipData[shipSet[result - 1]];
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

    diceRollBegin();
    setTimeout(() => {
        var rotation = diceRotations[result];
        var xRand = rotation[0];
        var yRand = rotation[1];

        cube.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';

        setTimeout(() => {
            diceRollEnd();
        }, 500);
        setTimeout(() => {
            holyShipSelected();
            var cards = document.getElementById("ssCard").parentElement.children;
            for (var i = 0; i < cards.length; i++) {
                cards[i].removeAttribute("chosen");
            }
            switch (result) {
                case 1:
                    document.getElementById("ssCard").setAttribute("chosen", "");
                    break;
                case 2:
                    document.getElementById("ddCard").setAttribute("chosen", "");
                    break;
                case 3:
                    document.getElementById("caCard").setAttribute("chosen", "");
                    break;
                case 4:
                    document.getElementById("bcCard").setAttribute("chosen", "");
                    break;
                case 5:
                    document.getElementById("bbCard").setAttribute("chosen", "");
                    break;
                case 6:
                    document.getElementById("cvCard").setAttribute("chosen", "");
                    break;
            }
            isRolling = false;
        }, 3500);
    }, 2000);
}

function checkAvailability() {
    switch (rollFrequencyIndex) {
        case DAILY:
            var savedDate = localStorage.getItem("currentDate");
            var today = new Date();
            var date = today.getTime();

            if (savedDate === null) {
                return true;
            } else {
                savedDate = Number(savedDate);
                var timeDifference = date - savedDate;
                var differenceInDays = timeDifference / (1000 * 60 * 60 * 24);
                return differenceInDays >= 1;
            }
        case RELOAD:
            return !alreadyShownThisSession;
        case THREE_THROWS:
            var totalThrows = parseInt(localStorage.getItem("totalTombolaThrows"));
            return totalThrows > 3;
    }
}

function dailyRollUsed() {
    // Daily condition
    localStorage.setItem("currentDate", new Date().getTime());
    // On Reload condition
    alreadyShownThisSession = true;
    // Three Throws condition
    localStorage.setItem("totalTombolaThrows", 0);

    localStorage.setItem("randomShipsDrawn", false);
}

function isDailyDiceAvailable() {
    var trigger = document.getElementById("dailyDiceTrigger");
    if (checkAvailability()) {
        trigger.style.display = "";
    } else {
        trigger.style.display = "none";
    }
}

function unflippShipCard(self) {
    if (self !== null && !self.hasAttribute("un-flipped")) {
        turnCard();
        self.setAttribute("un-flipped", "");
    }
}

/* Functions for Settings  */

function updateDiceRollType(index, self) {
    if(self !== null) self.value = index;

    localStorage.setItem("diceRollType", index);
    rollTypeIndex = index;
}

function updateDiceRollFrequency(index, self) {
    if(self !== null) self.value = index;

    localStorage.setItem("diceRollFrequency", index);
    rollFrequencyIndex = index;
}

function delayedUpdateDiceRollSettings(delay) {
    setTimeout(() => {
        updateDiceRollSettings();
    }, delay);
}

function updateDiceRollSettings() {
    if (localStorage.getItem("diceRollType") !== null) {
        updateDiceRollType(localStorage.getItem("diceRollType"), document.getElementById("diceRollType"));
    }
    if (localStorage.getItem("diceRollFrequency") !== null) {
        updateDiceRollFrequency(localStorage.getItem("diceRollFrequency"), document.getElementById("diceRollFrequency"));
    }
}