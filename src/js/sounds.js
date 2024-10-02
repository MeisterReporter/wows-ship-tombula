var ihhhSounds = [];
var ohhhSounds = [];

var confettiPopSound;

var volume = 100;
var crazyMode = false;

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
}