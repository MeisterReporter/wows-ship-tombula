const containers = document.getElementsByClassName("confetti");
var confettiFired = true;
/////////////////////
// Confetii Config //
/////////////////////
var confettiAmount = 100;
// Spread
var horizontalMax = 500;
var verticalMax = 150;
var depthMax = 500;
// Color
// 1 to 360
var baseHue = 1;
// 1 is no variation and 360 is maximum variation
var hueVariation = 360;
// Size
var minWidth = 5;
var maxWidth = 25;
// Shape
var confettiShape = 0.75;
// Spin turns
var maxSpinX = 10;
var maxSpinY = 10;
var maxSpinZ = 10;

function launchConfetti() {
    for (let i = 0; i < containers.length; i++) {
        let container = containers[i];
        // Clear child nodes
        container.innerHTML = "";
        // Populate container
        for (let c = 0; c < confettiAmount; c++) {
            var span = container.appendChild(document.createElement("span"));

            var offsetX = randomHalfNegative(horizontalMax);
            var offsetY = randomHalfNegative(verticalMax);
            var offsetZ = randomHalfNegative(depthMax);

            var hue = baseHue + randomHalfNegative(hueVariation);
            var size = Math.max(Math.random() * maxWidth, minWidth);
            var shape = Math.random() - confettiShape;

            var spinX = Math.random() * maxSpinX;
            var spinY = Math.random() * maxSpinY;
            var spinZ = Math.random() * maxSpinZ;
            span.style.setProperty("--offsetX", offsetX + "px");
            span.style.setProperty("--offsetY", offsetY + "px");
            span.style.setProperty("--offsetZ", offsetZ + "px");

            span.style.setProperty("--hue", hue);
            span.style.setProperty("--confetti-size", size + "px");
            span.style.setProperty("--shape", shape);

            span.style.setProperty("--spinX", spinX + "turn");
            span.style.setProperty("--spinY", spinY + "turn");
            span.style.setProperty("--spinZ", spinZ + "turn");
        }
        // Start the Animation
        container.classList.add("explosion");
        // Remove the animation class
        container.addEventListener("animationend", () => {
            container.classList.remove("explosion");
            container.innerHTML = "";
        }, {once: true});
    }
}

function randomHalfNegative(value) {
    return (value / 2) - (Math.random() * value);
}

function updateAmount(amount, self) {
    var display = document.getElementById("feedbackConfettiCount");
    if (display !== null) display.innerHTML = amount;
    if(self !== null) self.value = amount;

    localStorage.setItem("feedbackConfettiCount", amount);
    confettiAmount = amount;
}

function updateHorizontalMax(amount, self) {
    var display = document.getElementById("feedbackHorizontalMax");
    if (display !== null) display.innerHTML = amount;
    if(self !== null) self.value = amount;

    localStorage.setItem("feedbackHorizontalMax", amount);

    horizontalMax = amount;
}

function updateVerticalMax(amount, self) {
    var display = document.getElementById("feedbackVerticalMax");
    if (display !== null) display.innerHTML = amount;
    if(self !== null) self.value = amount;

    localStorage.setItem("feedbackVerticalMax", amount);

    verticalMax = amount;
}

function delayedUpdateConfettiValues(delay) {
    setTimeout(() => {
        updateConfettiValues();
    }, delay);
}

function updateConfettiValues() {
    if (localStorage.getItem("feedbackConfettiCount") !== null) {
        updateAmount(localStorage.getItem("feedbackConfettiCount"), document.getElementById("confettiAmount"));
    }
    if (localStorage.getItem("feedbackHorizontalMax") !== null) {
        updateHorizontalMax(localStorage.getItem("feedbackHorizontalMax"), document.getElementById("confettiHorizontal"));
    }
    if (localStorage.getItem("feedbackVerticalMax") !== null) {
        updateVerticalMax(localStorage.getItem("feedbackVerticalMax"), document.getElementById("confettiVertical"));
    }
}