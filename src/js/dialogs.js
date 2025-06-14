/**
 * Adds a dialog to the screen.
 * @param {string} title The title of the dialog, can be a localization key. Requires translate to be true.
 * @param {string} content The content of the dialog, can be a localization key. Requires translate to be true.
 * @param {boolean} translate Whether to translate the title and content using the localization system.
 * @param {string} buttonText The text of the button, can be a localization key. If undefined, defaults to "key.button.close".
 * @param {*} callback The optional callback function to be called when the dialog is closed.
 */
function addDialog(title, content, translate, buttonText, callback) {
    // Close Animations
    if (document.getElementsByClassName("dialog-background").length > 0) {
        document.getElementsByClassName("dialog")[0].style["animation"] = "close-dialog 500ms ease-out";
        document.getElementsByClassName("dialog-background")[0].style["animation"] = "hide-background 500ms ease-out";
        setTimeout(() => {
            var background = document.getElementsByClassName("dialog-background")[0];
            background.style["opacity"] = "0";
            background.style["display"] = "none";
            background.remove();
        }, 450);
    }
    // Construct Dialog
    var background = document.createElement("div");
    background.classList.add("dialog-background");
    var dialog = document.createElement("div");
    dialog.classList.add("dialog");
    background.appendChild(dialog);
    // Heading
    var heading = document.createElement("h1");
    heading.innerHTML = title;
    if (translate) applyLocalizationTo(heading, title, true);
    dialog.appendChild(heading);
    // Content
    var paragraph = document.createElement("p");
    paragraph.classList.add("dialog-content");
    paragraph.innerHTML = content;
    if (translate) applyLocalizationTo(paragraph, content, true);
    dialog.appendChild(paragraph);
    // Button
    var buttonContent = document.createElement("div");
    buttonContent.classList.add("dialog-button-content");
    var button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("dialog-button");
    if (typeof buttonText === 'undefined') {
        applyLocalizationTo(button, "key.button.close", false);
    } else {
        if (translate) {
            applyLocalizationTo(button, buttonText, false)
        } else {
            button.innerHTML = buttonText;
        }
    }
    buttonContent.appendChild(button);
    dialog.appendChild(buttonContent);
    // Add Close listener
    button.addEventListener("click", () => {
        if (typeof callback !== 'undefined') {
            callback();
        }
        // Close Animations
        dialog.style["animation"] = "close-dialog 500ms ease-out";
        background.style["animation"] = "hide-background 500ms ease-out";
        setTimeout(() => {
            var background = document.getElementsByClassName("dialog-background")[0];
            background.style["opacity"] = "0";
            background.style["display"] = "none";
            background.remove();
        }, 450);
    });
    // Add to document
    document.getElementsByTagName("body")[0].appendChild(background);
    // Show Animations
    dialog.style["animation"] = "open-dialog 500ms ease-out";
    background.style["animation"] = "show-background 250ms ease-out";
}

/**
 * Adds a dialog to the screen based on a template.
 * @param {*} title The title of the dialog, can be a localization key. Requires translate to be true.
 * @param {*} templateName The name of the template file to load, without the language suffix.
 * @param {*} buttonText The text of the button, can be a localization key. If undefined, defaults to "key.button.close".
 * @param {*} callback The optional callback function to be called when the dialog is closed.
 */
function addDialogTemplate(title, templateName, buttonText, callback) {
    // Find the correct language file
    var lang = navigator.language.substring(0, 2);
    if (lang !== "de") {
        lang = "en";
    }
    // Load it
    fetch("./src/templates/" + templateName + "_" + lang + ".html")
    .then((response) => response.text())
    .then((text) => {
        addDialog(title, text, false, buttonText, callback);
    });
}

function closeDialog() {
    // Close Animations
    if (document.getElementsByClassName("dialog-background").length > 0) {
        document.getElementsByClassName("dialog")[0].style["animation"] = "close-dialog 500ms ease-out";
        document.getElementsByClassName("dialog-background")[0].style["animation"] = "hide-background 500ms ease-out";
        setTimeout(() => {
            var background = document.getElementsByClassName("dialog-background")[0];
            background.style["opacity"] = "0";
            background.style["display"] = "none";
            background.remove();
        }, 450);
    }
}

function addConfirmDialog(title, content, translate, buttonTextYes, buttonTextNo, callbackYes, callbackNo) {
    addDialog(title, content, translate, buttonTextYes, callbackYes);
    var buttonContent = document.getElementsByClassName("dialog-button-content")[0];
    var button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("dialog-button");
    button.innerHTML = buttonTextNo;
    if (translate) applyLocalizationTo(button, buttonTextNo, false);
    buttonContent.appendChild(button);
    // Add Close listener
    button.addEventListener("click", () => {
        if (typeof callbackNo !== 'undefined') {
            callbackNo();
        }
        closeDialog();
    });
}