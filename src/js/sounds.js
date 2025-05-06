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
var correctPair
var wrongPair;
var levelPassed;

var memoryMusicFiles = [];
var memoryMusicSound;

var nereDiabolusSound;

var volume = 100;
var scratchSounds = true;
var crazyMode = false;
var memoryMusic = true;

var holySFXVolume = 0.2;
var memoryMusicVolume = 0.05;

var dropCoinSound;
var phoneRingingSound;
var phoneHangupSound;

var liveShowWelcome;
var liveShowCallWelcome = [];
var liveShowIdle = [];
var liveShowAnswerWrong = [];
var liveShowAnswerSuperWrong;
var liveShowAnswerCorrent = [];
var liveShowAnswerDeal;
var liveShowGlaspenis;
var liveShowHabicht;
var liveShowCallCost;

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

    correctPair = new Audio("src/aud/correct.mp3");
    wrongPair = new Audio("src/aud/wrong.mp3");
    levelPassed = new Audio("src/aud/level-passed.mp3");

    memoryMusicFiles = [];
    memoryMusicFiles.push(new Audio("src/aud/memory_no_1.mp3"));
    memoryMusicFiles.push(new Audio("src/aud/memory_no_2.mp3"));
    memoryMusicFiles.push(new Audio("src/aud/memory_no_3.mp3"));
    memoryMusicFiles.push(new Audio("src/aud/memory_no_4.mp3"));

    nereDiabolusSound = new Audio("src/aud/Nere_Diabolus_Lache.mp3");

    dropCoinSound = new Audio("src/aud/coin-drops-and-spins.mp3");
    phoneRingingSound = new Audio("src/aud/vintage-phone-ringing.mp3");
    phoneHangupSound = new Audio("src/aud/hang_up_call.mp3");

    liveShowWelcome = new Audio("src/aud/live/einleitung-1.mp3");

    liveShowCallWelcome = [];
    liveShowCallWelcome.push(new Audio("src/aud/live/einleitung-2.mp3"));
    liveShowCallWelcome.push(new Audio("src/aud/live/einleitung-3.mp3"));
    liveShowCallWelcome.push(new Audio("src/aud/live/einleitung-4.mp3"));

    liveShowIdle = []
    liveShowIdle.push(new Audio("src/aud/live/idle-5.mp3"));
    liveShowIdle.push(new Audio("src/aud/live/idle-6.mp3"));

    liveShowAnswerWrong = [];
    liveShowAnswerWrong.push(new Audio("src/aud/live/falsch-11.mp3"));
    liveShowAnswerWrong.push(new Audio("src/aud/live/falsch-13.mp3"));
    liveShowAnswerWrong.push(new Audio("src/aud/live/falsch-14.mp3"));
    liveShowAnswerSuperWrong = new Audio("src/aud/live/falsch-12.mp3");

    liveShowAnswerCorrent = [];
    liveShowAnswerCorrent.push(new Audio("src/aud/live/richtig-7.mp3"));
    liveShowAnswerCorrent.push(new Audio("src/aud/live/richtig-8.mp3"));
    liveShowAnswerCorrent.push(new Audio("src/aud/live/richtig-9.mp3"));

    liveShowAnswerDeal = new Audio("src/aud/live/richtig-10.mp3");

    liveShowGlaspenis = new Audio("src/aud/live/insider-15.mp3");
    liveShowHabicht = new Audio("src/aud/live/insider-16.mp3");

    liveShowCallCost = new Audio("src/aud/live/idle-5.mp3");
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

function correctSound() {
    correctPair.volume = 0.5 * (volume / 100.0);
    correctPair.play();
}

function wrongSound() {
    wrongPair.volume = 0.1 * (volume / 100.0);
    wrongPair.play();
}

function levelPassedSound() {
    levelPassed.volume = 0.1 * (volume / 100.0);
    levelPassed.play();
}

function playNereDiabolusSound() {
    nereDiabolusSound.volume = 0.5 * (volume / 100.0);
    nereDiabolusSound.play();
}

function playCoinSound() {
    dropCoinSound.volume = 0.5 * (volume / 100.0);
    dropCoinSound.play();
}

function playPhoneRingSound() {
    phoneRingingSound.volume = 0.25 * (volume / 100.0);
    phoneRingingSound.play();
}

function playPhoneHangupSound() {
    phoneHangupSound.volume = 0.25 * (volume / 100.0);
    phoneHangupSound.play();
}

function play10LiveWelcomeSound() {
    liveShowWelcome.volume = 1 * (volume / 100.0);
    liveShowWelcome.play();
    moderatorTalk(liveShowWelcome.duration);
}

function play10LiveCallerWelcomeSound() {
    let audio = randomSound(liveShowCallWelcome);
    audio.volume = 1 * (volume / 100.0);
    audio.play();
    moderatorTalk(audio.duration);
}

function play10LiveIdle() {
    if (isModeratorTalking) {
        setTimeout(() => {
            play10LiveIdle();
        }, moderatorTalkingLength + 100);
        return;
    }
    if (document.hidden) return;
    let audio = randomSound(liveShowIdle);
    audio.volume = 1 * (volume / 100.0);
    audio.play();
    moderatorTalk(audio.duration);
}

function play10LiveWrong() {
    let audio = randomSound(liveShowAnswerWrong);
    audio.volume = 1 * (volume / 100.0);
    audio.play();
    moderatorTalk(audio.duration);
}

function play10LiveSuperWrong() {
    liveShowAnswerSuperWrong.volume = 1 * (volume / 100.0);
    liveShowAnswerSuperWrong.play();
    moderatorTalk(liveShowAnswerSuperWrong.duration);
}

function play10LiveCorrect() {
    let audio = randomSound(liveShowAnswerCorrent);
    audio.volume = 1 * (volume / 100.0);
    audio.play();
    moderatorTalk(audio.duration);
}

function play10LiveOfferADeal() {
    liveShowAnswerDeal.volume = 1 * (volume / 100.0);
    liveShowAnswerDeal.play();
    moderatorTalk(liveShowAnswerDeal.duration);
}

function play10LiveGlaspenis() {
    liveShowGlaspenis.volume = 1 * (volume / 100.0);
    liveShowGlaspenis.play();
    moderatorTalk(liveShowGlaspenis.duration);
}

function play10LiveHabicht() {
    liveShowHabicht.volume = 1 * (volume / 100.0);
    liveShowHabicht.play();
    moderatorTalk(liveShowHabicht.duration);
}

function play10LiveCallCost() {
    liveShowCallCost.volume = 1 * (volume / 100.0);
    liveShowCallCost.play();
    moderatorTalk(liveShowCallCost.duration);
}

function stopAll9LiveSounds() {
    liveShowWelcome.pause();
    liveShowWelcome.currentTime = 0;
    for (let i = 0; i < liveShowCallWelcome.length; i++) {
        liveShowCallWelcome[i].pause();
        liveShowCallWelcome[i].currentTime = 0;
    }
    for (let i = 0; i < liveShowIdle.length; i++) {
        liveShowIdle[i].pause();
        liveShowIdle[i].currentTime = 0;
    }
    for (let i = 0; i < liveShowAnswerWrong.length; i++) {
        liveShowAnswerWrong[i].pause();
        liveShowAnswerWrong[i].currentTime = 0;
    }
    liveShowAnswerSuperWrong.pause();
    liveShowAnswerSuperWrong.currentTime = 0;
    for (let i = 0; i < liveShowAnswerCorrent.length; i++) {
        liveShowAnswerCorrent[i].pause();
        liveShowAnswerCorrent[i].currentTime = 0;
    }
    liveShowAnswerDeal.pause();
    liveShowAnswerDeal.currentTime = 0;
    liveShowGlaspenis.pause();
    liveShowGlaspenis.currentTime = 0;
    liveShowHabicht.pause();
    liveShowHabicht.currentTime = 0;
    liveShowCallCost.pause();
    liveShowCallCost.currentTime = 0;
    isModeratorTalking = false;
}

function playMemoryMusic() {
    let audio = randomSound(memoryMusicFiles);
    if (audio == null || memoryMusicSound != null) return;
    const indicator = document.getElementById("memory-music");
    if (indicator !== null && !indicator.hasAttribute("play")) return;
    audio.volume = memoryMusicVolume * (volume / 100.0);
    audio.play();
    audio.onended = () => {
        memoryMusicSound = null;
        const indicator = document.getElementById("memory-music");
        if (indicator !== null && indicator.hasAttribute("play")) {
            playMemoryMusic();
        }
    }
    memoryMusicSound = audio;

    document.onvisibilitychange = (event) => {
        if (document.hidden) {
            if (memoryMusicSound != null) memoryMusicSound.pause();
        } else {
            const indicator = document.getElementById("memory-music");
            if (indicator !== null && indicator.hasAttribute("play")) {
                if (memoryMusicSound != null) memoryMusicSound.play();
            }
        }
    };
}

function stopMemoryMusic() {
    if (memoryMusicSound != null) {
        memoryMusicSound.pause();
        memoryMusicSound = null;
    }
}

/* Sound Settings */

function updateVolume(amount, self) {
    var display = document.getElementById("feedbackVolumeCount");
    if (display !== null) display.innerHTML = amount;
    if(self !== null) self.value = amount;

    localStorage.setItem("feedbackVolumeCount", amount);
    volume = amount;
    if (memoryMusicSound != null) memoryMusicSound.volume = memoryMusicVolume * (volume / 100.0);
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

function updateMemoryMusic(toggle, self) {
    toggle = JSON.parse(toggle);
    var display = document.getElementById("feedbackMemoryMusic");
    if (display !== null) {
        if (toggle) {
            applyLocalizationTo(display, "key.turnedOn", true);
        } else {
            applyLocalizationTo(display, "key.turnedOff", true);
        }
    }
    if(self !== null) self.checked = toggle;

    localStorage.setItem("memoryMusic", toggle);
    memoryMusic = toggle;
    if (toggle) {
        playMemoryMusic();
    } else {
        stopMemoryMusic();
    }
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
    if (localStorage.getItem("memoryMusic") !== null) {
        updateMemoryMusic(localStorage.getItem("memoryMusic"), document.getElementById("memoryMusic"));
    }
}