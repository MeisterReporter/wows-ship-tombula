function checkVersion() {
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
        // Get the current version
        var version = json["version"];
        // Get the last version
        var lastReloadVersion = localStorage.getItem("ReloadVersion");
        var lastVersion = localStorage.getItem("Version");
        // Compare
        if (lastReloadVersion === null || version !== lastReloadVersion) {
            console.log("Update available");
            addDialog("key.dialog.new_version.title", "key.dialog.new_version.content", true, "key.dialog.new_version.button",() => {
                location.reload(true);
            });
            localStorage.setItem("ReloadVersion", version);
        } else {
            if (lastVersion !== null && version != lastVersion) {
                addDialog("key.dialog.pathnotes.title", "key.dialog.pathnotes.content", true);
                window.localStorage.setItem("Version", version);
            } else if (lastVersion === null) {
                addDialog("key.dialog.pathnotes.title", "key.dialog.pathnotes.content", true);
                window.localStorage.setItem("Version", version);
            }
        }
    });
}