function addDialog(title, content, translate) {
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
    paragraph.innerHTML = content;
    if (translate) applyLocalizationTo(paragraph, content, true);
    dialog.appendChild(paragraph);
    // Button
    var button = document.createElement("a");
    button.classList.add("button");
    button.classList.add("dialog-button");
    applyLocalizationTo(button, "key.button.close", false);
    dialog.appendChild(button);
    // Add Close listener
    button.addEventListener("click", () => {
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