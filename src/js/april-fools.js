var enableAprilMessages = true;
var gotMessages = [];

function startNautyMessages() {
    setTimeout(() => showNautyMessages(), Math.floor(Math.random() * 5000) + 20000);
}

function showNautyMessages() {
    if (!enableAprilFools || !enableAprilMessages) return;
    if (document.getElementsByClassName("nauty-message-container").length <= 0) {
        addNautyMessage();
    }
    setTimeout(() => showNautyMessages(), Math.floor(Math.random() * 5000) + 30000);
}

function addNautyMessage() {
    fetch("./src/data/nauty-messages.json")
    .then((response) => response.json())
    .then((json) => {
        var newJson = json.filter(entry => !gotMessages.includes(entry.Ship));
        if (gotMessages.length == json.length) {
            gotMessages = [];
            newJson = json;
        }
        console.log(newJson);
        // Find random message
        const randomIndex = Math.floor(Math.random() * newJson.length);
        const nautyMessage = newJson[randomIndex];
        var shipName = nautyMessage.Ship;
        var message = nautyMessage.Message;
        // Find ship
        var ship = null;
        for (let index = 0; index < shipData.length; index++) {
            const element = shipData[index];
            if (shipName == element.name) {
                ship = element;
                gotMessages.push(ship.name);
                break;
            }
        }
        // Construct message
        var div = document.createElement("div");
        div.classList.add("nauty-message-container");
        div.innerHTML = createNautyMessage(ship.name, ship.image, message, Math.floor(Math.random() * 39) + 1);
        document.getElementsByTagName("body")[0].appendChild(div);
        applyLocalization(div);
    });
}

function checkFoolShipNames() {
    fetch("./src/data/nauty-messages.json")
    .then((response) => response.json())
    .then((json) => {
        var foundShips = [];
        // Find random message
        for (let i = 0; i < json.length; i++) {
            const nautyMessage = json[i];
            var shipName = nautyMessage.Ship;
            // Find ship
            for (let j = 0; j < shipData.length; j++) {
                const element = shipData[j];
                if (shipName == element.name) {
                    foundShips++;
                    continue;
                }
            }
        }
        console.log("Found " + foundShips + " ships of " + json.length + ".");
    });
}

function removeNautyMesssage() {
    var elements = document.getElementsByClassName("nauty-message-container");
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.style["animation"] = "hideMessage 500ms ease-out";
        setTimeout(() => {
            element.style["display"] = "none";
            element.remove();
        }, 490);
    }
}

/* Functions for Settings  */

function updateAprilMessages(toggle, self) {
    toggle = JSON.parse(toggle);
    var display = document.getElementById("feedbackAprilMessages");
    if (display !== null) {
        if (toggle) {
            applyLocalizationTo(display, "key.turnedOn", true);
        } else {
            applyLocalizationTo(display, "key.turnedOff", true);
        }
    }
    if(self !== null) self.checked = toggle;

    if (localStorage.getItem("AprilMessages") === "false" && toggle) {
        startNautyMessages();
    }

    localStorage.setItem("AprilMessages", toggle);
    enableAprilMessages = toggle;
}

function delayedAprilMessagesSettings(delay) {
    setTimeout(() => {
        updateAprilMessagesSettings();
    }, delay);
}

function updateAprilMessagesSettings() {
    if (localStorage.getItem("AprilMessages") !== null) {
        updateAprilMessages(localStorage.getItem("AprilMessages"), document.getElementById("aprilMessages"));
    }
}