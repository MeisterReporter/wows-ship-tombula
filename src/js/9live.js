var callingBudget = 0;
var paidBudget = 0;
var fails = 0;
var trys = 0;
var gameOver = false;
var isModeratorTalking = false;
var moderatorTalkingLength = 0;

const countCharacter = (str, char) => str.toLowerCase().split(char).length - 1;

/**
 * Gets a list of ships whichs name matches the specified options.
 * @param {char} character The character to search for in their names.
 * @param {int} count The number of times the character should appear in the name.
 * @param {string} mode The mode of the search. It can be "exact", "atLeast", "moreThan" or "maximum". While maximum requires still at least one occurance of the character.
 * @returns The List of ships that have the character in their name.
 */
function getShipsWith(character, count, mode) {
    var selection = [];
    for (let i = 0; i < shipData.length; i++) {
        const ship = shipData[i];
        const shipName = ship.name.toLowerCase();
        if (shipName.includes(character) && selectedItems[ship.name]) {
            const occ = countCharacter(shipName, character);
            const entry = ship.name;
            if (mode === "exact" && occ == count) {
                selection.push(entry);
            } else if (mode === "atLeast" && occ >= count) {
                selection.push(entry);
            } else if (mode === "moreThan" && occ > count) {
                selection.push(entry);
            } else if (mode === "maximum" && occ <= count) {
                selection.push(entry);
            }
        }
    }

    return selection;
}

function getShipSetWith(setSize, character, count, mode) {
    var size = 0;
    var trys = 0;
    var lastSet = null;
    while (size < setSize && trys <= 30) {
        var selection = getShipsWith(character, count, mode);
        size = selection.length;
        if (size >= setSize) {
            var shipSet = [];
            for (let i = 0; i < setSize; i++) {
                const randomIndex = Math.floor(Math.random() * selection.length);
                const entry = selection[randomIndex];
                shipSet.push(entry);
                selection.splice(randomIndex, 1);
            }
            return shipSet;
        }
        lastSet = selection;
        trys++;
    }

    return lastSet;
}

/**
 * Checks if the occurrence of the character in the ship names matches the specified mode.
 * In rare cases the selected mode might be misleading e.g. each word has only one 
 * occurence of the character, but the mode is set to maximum 2. In this case the mode 
 * should be adjusted to exact 1 and true is returned.
 * 
 * @param {*} mode The mode to check against.
 * @param {*} character The character to check for.
 * @param {*} count The count to check for.
 * @param {*} ships The list of ship names to check.
 * @returns True if the occurrence matches the mode, false otherwise.
 */
function checkIfOccuranceShouldBeExact(mode, character, count, ships) {
    if (mode == "exact") {
        return true;
    } else if (mode == "atLeast" || mode == "moreThan" || mode == "maximum") {
        var lastOccurance = 0;
        var valid = false;
        for (let i = 0; i < ships.length; i++) {
            const shipName = ships[i];
            const occurance = countCharacter(shipName, character);
            if (occurance != lastOccurance && lastOccurance != 0) {
                valid = true;
                break;
            }
            lastOccurance = occurance;
        }
        return valid;
    }
    return false;
}

function get9LiveShipSet(iterations = 30, maxCount = 2, minSetSize = 3, maxSetSize = 6) {
    if (iterations < 0) {
        return null;
    }
    var character = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    var count = Math.floor(Math.random() * maxCount) + 1;
    var modeNumber = Math.floor(Math.random() * 4);
    var mode = "exact";
    switch (modeNumber) {
        case 0:
            mode = "exact";
            break;
        case 1:
            mode = "atLeast";
            break;
        case 2:
            mode = "moreThan";
            break;
        case 3:
            mode = "maximum";
            break;
    }
    // Special case if maximum ist selected and count is 1
    if (mode == "maximum" && count == 1) {
        mode = "exact";
    }
    console.log("Character: " + character + ", Count: " + count + ", Mode: " + mode);

    const requiredLength = Math.floor(Math.random() * (maxSetSize - minSetSize + 1)) + minSetSize;
    var shipSet = getShipSetWith(requiredLength, character, count, mode);
    if (shipSet.length < requiredLength) {
        console.log("Got not enough ships (" + shipSet.length + "), trying again.");
        return get9LiveShipSet(iterations - 1);
    }
    // Check of the random mode is valid
    if (!checkIfOccuranceShouldBeExact(mode, character, count, shipSet)) {
        mode = "exact";
        // Calculate the new count, based on the first ship entry. 
        // This is possible because we know that each ship in the ship set has the same count of the character.
        count = countCharacter(shipSet[0], character);
        console.log("Adjusted options: Character: " + character + ", Count: " + count + ", Mode: " + mode);
    }

    return {
        "character": character,
        "count": count,
        "mode": mode,
        "shipSet": shipSet
    };
}

function init9LiveShow() {
    const showOptions = get9LiveShipSet();
    if (showOptions === null) {
        console.log("Could not find a valid ship set.");
        return;
    }
    const character = showOptions.character;
    const count = showOptions.count;
    const mode = showOptions.mode;
    const shipSet = showOptions.shipSet;

    // Show question
    const question = document.getElementById("9liveQuestion");
    getLocalizedString("key.9live.question").then((value) => {
        const text = value;
        getLocalizedString("key." + count + (count == 1 ? "." : "")).then((value) => {
            const numberText = value;
            getLocalizedString("key.9live." + mode).then((value) => {
                question.innerText = text.replace("{character}", character).replace("{count}", numberText).replace("{mode}", value);
            });
        });
    })
    // Show board
    const board = document.getElementById("9liveBoard");
    // Clear board
    board.innerHTML = "";
    // Create board
    for (let i = 0; i < shipSet.length; i++) {
        const shipName = shipSet[i];
        const tile = document.createElement("div");
        const text = document.createElement("p");
        text.innerText = shipName;
        tile.classList.add("nine-live-tile");
        tile.setAttribute("hidden", "");
        board.appendChild(tile);
        tile.appendChild(text);
    }

    // Money
    const money = document.getElementById("9liveMoney");
    money.addEventListener("click", function () {
        money.style.animation = "money-insert 0.8s ease-in";
        callingBudget += 1;
        paidBudget += 1;
        const callingButton = document.getElementsByClassName("nine-live-call")[0];
        if (callingBudget >= 2) {
            callingButton.setAttribute("active", "");
            callingButton.removeAttribute("inactive");
        } else {
            callingButton.setAttribute("inactive", "");
            callingButton.removeAttribute("active");
        }
        playCoinSound();
        update9liveStatistics();
        setTimeout(() => {
            money.style.animation = "money-get 0.5s ease-in";
        }, 750);
    });

    // Answering
    const answer = document.getElementById("9liveAnswer");
    answer.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            const answerValue = answer.value.toLowerCase();
            // Hide answer input box
            const solution = document.getElementById("9liveSolution");
            solution.setAttribute("hidden", "");
            // Check answer
            for (let i = 0; i < shipSet.length; i++) {
                const shipName = shipSet[i].toLowerCase();
                if (shipName == answerValue) {
                    if (Math.random() > 0.5) {
                        offerADeal9Live(answerValue, i, true);
                        answer.value = "";
                        return;
                    } else {
                        // Show answer
                        const tile = board.children[i];
                        tile.removeAttribute("hidden");
                        const status = document.getElementById("9liveSuccess");
                        status.removeAttribute("hidden");
                        const status2 = document.getElementById("9liveFail");
                        status2.setAttribute("hidden", "");
                        const offer = document.getElementById("9liveOffer");
                        offer.setAttribute("hidden", "");
                        answer.value = "";
                        play10LiveCorrect();
                        updateCallingStatus();
                        checkfor9LiveEnd();
                        celebrateShip9live(answerValue);
                        return;
                    }
                }
            }
            // Show wrong answer
            const status = document.getElementById("9liveFail");
            status.removeAttribute("hidden");
            const status2 = document.getElementById("9liveSuccess");
            status2.setAttribute("hidden", "");
            if (answerValue.toLowerCase() == "glaspenis") {
                play10LiveGlaspenis();
                fails++;
                update9liveStatistics();
            } else if (answerValue.toLowerCase() == "habicht") {
                play10LiveHabicht();
                fails++;
                update9liveStatistics();
            } else if (!answerValue.includes(character)) {
                play10LiveSuperWrong();
                fails++;
                update9liveStatistics();
            } else {
                if (Math.random() > 0.8) {
                    status.setAttribute("hidden", "");
                    offerADeal9Live(answerValue);
                } else {
                    play10LiveWrong();
                    fails++;
                    update9liveStatistics();
                }
            }
            answer.value = "";
            updateCallingStatus();
            if (fails >= 10) {
                document.getElementById("9liveGiveup").removeAttribute("hidden");
            }
        }
    });

    const datalist = document.getElementById("9liveAnswerList");
    for (let i = 0; i < shipData.length; i++) {
        var option = document.createElement("option");
        option.value = shipData[i].name;
        datalist.appendChild(option);
    }

    play10LiveWelcomeSound();

    startIdle(true);

    update9liveStatistics();
}

function call9Live() {
    if (document.getElementsByClassName("nine-live-call")[0].hasAttribute("calling")) {
        updateCallingStatus();
        playPhoneHangupSound();
        stopAll9LiveSounds();
        const solution = document.getElementById("9liveSolution");
        solution.setAttribute("hidden", "");
        const status1 = document.getElementById("9liveSuccess");
        status1.setAttribute("hidden", "");
        const status2 = document.getElementById("9liveFail");
        status2.setAttribute("hidden", "");
        const offer = document.getElementById("9liveOffer");
        offer.setAttribute("hidden", "");
        return;
    }
    if (callingBudget >= 2) {
        // Call
        callingBudget -= 2;
        const callingButton = document.getElementsByClassName("nine-live-call")[0];
        callingButton.setAttribute("calling", "");
        callingButton.removeAttribute("active");
        callingButton.removeAttribute("inactive");
        playPhoneRingSound();
        setTimeout(() => {
            const phone = document.getElementById("9livePhone");
            phone.style.animation = "phone-ringing 1s linear";
            setTimeout(() => {
                phone.style.animation = "none";
            }, 1000);
        }, 200);
        setTimeout(() => {
            play10LiveCallerWelcomeSound();
        }, 500);
        // Show Solution input box
        const solution = document.getElementById("9liveSolution");
        solution.removeAttribute("hidden");
        const status1 = document.getElementById("9liveSuccess");
        status1.setAttribute("hidden", "");
        const status2 = document.getElementById("9liveFail");
        status2.setAttribute("hidden", "");
        const offer = document.getElementById("9liveOffer");
        offer.setAttribute("hidden", "");
        
        trys++;
        update9liveStatistics();
    } else {
        addDialog("key.dialog.9liveMoney.title", "key.dialog.9liveMoney.content", true);
        play10LiveCallCost();
    }
}

function startIdle(first = true) {
    const randomTimeout = Math.floor(Math.random() * 15000) + 25000;
    if (first) {
        setTimeout(() => {
            startIdle(false);
        }, randomTimeout);
    } else {
        if (Math.random() > 0.5 && !gameOver) {
            play10LiveIdle();
        }
        setTimeout(() => {
            startIdle(false);
        }, randomTimeout);
    }
}

function offerADeal9Live(answer, index = -1, correct = false) {
    play10LiveOfferADeal();
    // Offer a deal
    getLocalizedString("key.dialog.9liveOffer.title").then((value) => {
        const title = value;
        getLocalizedString("key.dialog.9liveOffer.content").then((value) => {
            const content = value;
            getLocalizedString("key.dialog.9liveOffer.confirm").then((value) => {
                const confirm = value;
                getLocalizedString("key.dialog.9liveOffer.cancel").then((value) => {
                    const cancel = value;
                    const ship = shipData[getRandomIndex(["SS", "DD", "CL", "CA", "BC", "BB", "CV"], [], foolShips)];
                    addConfirmDialog(title, content + " " + ship.name, false, confirm, cancel,
                    () => {
                        if (index > -1) {
                            // Show answer
                            const board = document.getElementById("9liveBoard");
                            const tile = board.children[index];
                            tile.removeAttribute("hidden");
                        }
                        if (correct) {
                            const status = document.getElementById("9liveSuccess");
                            status.removeAttribute("hidden");
                            const status2 = document.getElementById("9liveFail");
                            status2.setAttribute("hidden", "");
                            const offer = document.getElementById("9liveOffer");
                            offer.setAttribute("hidden", "");
                            play10LiveCorrect();
                            checkfor9LiveEnd();
                            setTimeout(() => {
                                celebrateShip9live(answer);
                            }, 1000);
                        } else {
                            const status = document.getElementById("9liveFail");
                            status.removeAttribute("hidden");
                            const status2 = document.getElementById("9liveSuccess");
                            status2.setAttribute("hidden", "");
                            play10LiveWrong();
                            fails++;
                            update9liveStatistics();
                        }
                        updateCallingStatus();
                    },
                    () => {
                        const offer = document.getElementById("9liveOffer");
                        offer.removeAttribute("hidden");
                        const offerText = document.getElementById("9liveOfferText");
                        offerText.innerText = ship.name;
                        const status = document.getElementById("9liveSuccess");
                        status.setAttribute("hidden", "");
                        const status2 = document.getElementById("9liveFail");
                        status2.setAttribute("hidden", "");
                        updateCallingStatus();
                    });
                });
            });
        });
    });
}

function moderatorTalk(seconds) {
    // console.log("Moderator is talking for " + seconds + " seconds.");
    const moderator = document.getElementsByClassName("moderator_nere")[0];
    if (moderator !== null) {
        isModeratorTalking = true;
        moderatorTalkingLength = seconds * 1000;
        const talkInterval = 250;
        var flip = false;
        for (let i = 0; i < (seconds * 1000) / talkInterval; i++) {
            setTimeout((flip) => {
                if (moderator !== null && moderatorTalkingLength > 0) {
                    if (flip) {
                        moderator.src = "src/img/Nere der Moderator Rede.png";
                    } else {
                        moderator.src = "src/img/Nere der Moderator.png";
                    }
                }
                moderatorTalkingLength -= talkInterval;
            }, i * talkInterval, flip);
            flip = !flip;
        }

        setTimeout(() => {
            moderator.src = "src/img/Nere der Moderator.png";
            isModeratorTalking = false;
        }, seconds * 1000 + 100);
    }
}

function updateCallingStatus() {
    const callingButton = document.getElementsByClassName("nine-live-call")[0];
    if (callingBudget >= 2) {
        callingButton.setAttribute("active", "");
        callingButton.removeAttribute("inactive");
        callingButton.removeAttribute("calling");
    } else {
        callingButton.setAttribute("inactive", "");
        callingButton.removeAttribute("active");
        callingButton.removeAttribute("calling");
    }
}

function checkfor9LiveEnd() {
    var passed = true;
    const tiles = document.getElementsByClassName("nine-live-tile");
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (tile.hasAttribute("hidden")) {
            passed = false;
            break;
        }
    }
    if (passed) {
        setTimeout(() => {
            levelPassedSound();
            addConfirmDialog("key.dialog.9liveEnd.title", "key.dialog.9liveEnd.content", true, "key.button.yes", "key.button.no", 
            () => {
                window.location.reload();
            },
            () => {
                window.location.replace('index.html');
            });
            getLocalizedString("key.dialog.9liveEnd.statistic").then((value) => {
                const dialogContent = document.getElementsByClassName("dialog-content")[0];
                dialogContent.innerHTML += " " + value + " " + paidBudget + " C";
            });
        }, 2000);
    }
}

function giveUp9Live() {
    const board = document.getElementById("9liveBoard");
    for (let i = 0; i < board.children.length; i++) {
        const element = board.children[i];
        element.removeAttribute("hidden");
    }
    gameOver = true;
    // Disable Calling
    const money = document.getElementById("9liveMoney");
    money.setAttribute("hidden", "");
    const callingButton = document.getElementsByClassName("nine-live-call")[0];
    callingButton.removeAttribute("calling");
    callingButton.removeAttribute("active");
    callingButton.setAttribute("inactive", "");
    // Hide answer input box
    const solution = document.getElementById("9liveSolution");
    solution.setAttribute("hidden", "");
    // Calculate correct coins
    paidBudget -= callingBudget;
    callingBudget = 0;

    update9liveStatistics();
}

function update9liveStatistics() {
    const budget = document.getElementById("currentBudget");
    budget.innerText = callingBudget + " C";
    const totalBudget = document.getElementById("totalBudget");
    totalBudget.innerText = paidBudget + " C";
    const failAnswers = document.getElementById("failAnswers");
    failAnswers.innerText = fails;
    const totalTrys = document.getElementById("totalTrys");
    totalTrys.innerText = trys;
}

function celebrateShip9live(shipName) {
    var ship = null;
    for (let i = 0; i < shipData.length; i++) {
        const entry = shipData[i];
        if (entry.name.toLowerCase() == shipName) {
            ship = entry;
            break;
        }
    }
    if (ship === null) {
        console.error("Ship not found: " + shipName);
        return;
    }
    var shipCelebrate = document.getElementById("9liveShipCelebrate");
    shipCelebrate.removeAttribute("hidden");
    var ticket = document.getElementsByClassName("ship-ticket")[0];
    ticket.style.opacity = 0;
    setTimeout(() => {
        ticket.style.animation = "ship-card-flip 1s ease-out";
        launchConfetti();
        confettiPop();
    }, 50);
    setTimeout(() => {
        ticket.style.opacity = 1;
    }, 1000);
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
}

function close9LiveCelebrate() {
    var shipCelebrate = document.getElementById("9liveShipCelebrate");
    shipCelebrate.setAttribute("hidden", "");
}