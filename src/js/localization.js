function applyLocalization() {
    // Find the correct language file
    var lang = navigator.language.substring(0, 2);
    if (lang !== "de") {
        lang = "en";
    }
    var filename = "language_" + lang + ".json";
    // Load it
    fetch("./src/lang/" + filename)
    .then((response) => response.json())
    .then((json) => {
        var elements = document.querySelectorAll('[translatable]');
        for (let i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.childNodes.length == 1) {
                element.innerText = json[element.innerText];
            }
        }
    });
}

function applyLocalizationTo(element, key, applyHTML) {
    // Find the correct language file
    var lang = navigator.language.substring(0, 2);
    if (lang !== "de") {
        lang = "en";
    }
    var filename = "language_" + lang + ".json";
    // Load it
    fetch("./src/lang/" + filename)
    .then((response) => response.json())
    .then((json) => {
        element.innerText = json[key];
        if (applyHTML) element.innerHTML = json[key];
    });
}