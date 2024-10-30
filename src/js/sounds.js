var ihhhSounds = [];
var ohhhSounds = [];

var confettiPopSound;

var diceRollBeginSounds = [];
var diceRollEndSounds = [];

var spreadCardSounds = [];
var randomSpreadCardIndex = -1;
var spreadCardProgress = 0;
var turnCardSounds = [];

var holyShipSelect;

var volume = 100;
var scratchSounds = true;
var crazyMode = false;

var holySFXVolume = 0.2;

function loadSounds() {
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_01.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_02.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_03.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_04.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_05.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_06.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_07.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_08.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_09.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_10.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_11.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_12.mp3"));
    ihhhSounds.push(new Audio("src/aud/krado_ihhhh_13.mp3"));

    ohhhSounds.push(new Audio("src/aud/krado_owww_01.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_02.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_03.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_04.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_05.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_06.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_07.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_08.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_09.mp3"));
    ohhhSounds.push(new Audio("src/aud/krado_owww_10.mp3"));

    confettiPopSound = new Audio("src/aud/confetti_pop.mp3");

    diceRollBeginSounds.push(new Audio("src/aud/dice_roll_begin_01.mp3"));
    diceRollBeginSounds.push(new Audio("src/aud/dice_roll_begin_02.mp3"));
    diceRollBeginSounds.push(new Audio("src/aud/dice_roll_begin_03.mp3"));
    diceRollBeginSounds.push(new Audio("src/aud/dice_roll_begin_04.mp3"));

    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_01.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_02.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_03.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_04.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_05.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_06.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_07.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_08.mp3"));
    diceRollEndSounds.push(new Audio("src/aud/dice_roll_end_09.mp3"));

    var spreadCard01 = [];
    spreadCard01.push(new Audio("src/aud/spread_card_01_01.mp3"));
    spreadCard01.push(new Audio("src/aud/spread_card_01_02.mp3"));
    spreadCard01.push(new Audio("src/aud/spread_card_01_03.mp3"));
    spreadCard01.push(new Audio("src/aud/spread_card_01_04.mp3"));
    spreadCard01.push(new Audio("src/aud/spread_card_01_05.mp3"));
    spreadCard01.push(new Audio("src/aud/spread_card_01_06.mp3"));
    var spreadCard02 = [];
    spreadCard02.push(new Audio("src/aud/spread_card_02_01.mp3"));
    spreadCard02.push(new Audio("src/aud/spread_card_02_02.mp3"));
    spreadCard02.push(new Audio("src/aud/spread_card_02_03.mp3"));
    spreadCard02.push(new Audio("src/aud/spread_card_02_04.mp3"));
    spreadCard02.push(new Audio("src/aud/spread_card_02_05.mp3"));
    spreadCard02.push(new Audio("src/aud/spread_card_02_06.mp3"));
    var spreadCard03 = [];
    spreadCard03.push(new Audio("src/aud/spread_card_03_01.mp3"));
    spreadCard03.push(new Audio("src/aud/spread_card_03_02.mp3"));
    spreadCard03.push(new Audio("src/aud/spread_card_03_03.mp3"));
    spreadCard03.push(new Audio("src/aud/spread_card_03_04.mp3"));
    spreadCard03.push(new Audio("src/aud/spread_card_03_05.mp3"));
    spreadCard03.push(new Audio("src/aud/spread_card_03_06.mp3"));
    spreadCardSounds.push(spreadCard01);
    spreadCardSounds.push(spreadCard02);
    spreadCardSounds.push(spreadCard03);

    turnCardSounds.push(new Audio("src/aud/card_turn_01.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_02.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_03.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_04.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_05.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_06.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_07.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_08.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_09.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_10.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_11.mp3"));
    turnCardSounds.push(new Audio("src/aud/card_turn_12.mp3"));

    holyShipSelect = new Audio("src/aud/holy_ship_select.mp3");
}

function randomSound(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function scratchIhhh() {
    let audio = randomSound(ihhhSounds);
    audio.volume = 0.5 * (volume / 100.0);
    audio.play();  
}

function scratchOhhh() {
    let audio = randomSound(ohhhSounds);
    audio.volume = 0.5 * (volume / 100.0);
    audio.play();  
}

function confettiPop() {
    confettiPopSound.volume = 0.3 * (volume / 100.0);
    confettiPopSound.play();
}

function diceRollBegin() {
    let audio = randomSound(diceRollBeginSounds);
    audio.volume = 0.5 * (volume / 100.0);
    audio.play();
}

function diceRollEnd() {
    let audio = randomSound(diceRollEndSounds);
    audio.volume = 0.5 * (volume / 100.0);
    audio.play();
}

function spreadCards() {
    if (randomSpreadCardIndex === -1) {
        randomSpreadCardIndex = Math.floor(Math.random() * spreadCardSounds.length);
    }
    let audio = spreadCardSounds[randomSpreadCardIndex][spreadCardProgress];
    audio.volume = 0.5 * (volume / 100.0);
    audio.play();
    spreadCardProgress = (spreadCardProgress + 1) % 6;
}

function turnCard() {
    let audio = randomSound(turnCardSounds);
    audio.volume = 0.5 * (volume / 100.0);
    audio.play();
}

function holyShipSelected() {
    holyShipSelect.volume = holySFXVolume * (volume / 100.0);
    holyShipSelect.play();
}

/* Sound Settings */

function updateVolume(amount, self) {
    var display = document.getElementById("feedbackVolumeCount");
    if (display !== null) display.innerHTML = amount;
    if(self !== null) self.value = amount;

    localStorage.setItem("feedbackVolumeCount", amount);
    volume = amount;
}

function updateCrazyMode(toggle, self) {
    toggle = JSON.parse(toggle);
    var display = document.getElementById("feedbackCrazyMode");
    if (display !== null) {
        if (toggle) {
            applyLocalizationTo(display, "key.turnedOn", true);
        } else {
            applyLocalizationTo(display, "key.turnedOff", true);
        }
    }
    if(self !== null) self.checked = toggle;

    localStorage.setItem("crazyMode", toggle);
    crazyMode = toggle;
}

function updateScratchSounds(toggle, self) {
    toggle = JSON.parse(toggle);
    var display = document.getElementById("feedbackScratchSounds");
    if (display !== null) {
        if (toggle) {
            applyLocalizationTo(display, "key.turnedOn", true);
        } else {
            applyLocalizationTo(display, "key.turnedOff", true);
        }
    }
    if(self !== null) self.checked = toggle;

    localStorage.setItem("scratchSounds", toggle);
    scratchSounds = toggle;
}

function delayedUpdateAudioValues(delay) {
    setTimeout(() => {
        updateAudioValues();
    }, delay);
}

function updateAudioValues() {
    if (localStorage.getItem("feedbackVolumeCount") !== null) {
        updateVolume(localStorage.getItem("feedbackVolumeCount"), document.getElementById("volumeAmount"));
    }
    if (localStorage.getItem("crazyMode") !== null) {
        updateCrazyMode(localStorage.getItem("crazyMode"), document.getElementById("crazyMode"));
    }
    if (localStorage.getItem("scratchSounds") !== null) {
        updateScratchSounds(localStorage.getItem("scratchSounds"), document.getElementById("scratchSounds"));
    }
}