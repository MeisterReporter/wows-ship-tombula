var skins = { };

function initSkins(skinSupport = false) {
    var defaultSkinRef = document.getElementById("default-skin");
    var customSkinRef = document.getElementById("custom-skin");

    var currentSkin = localStorage.getItem("skin") || "default";
    if (currentSkin === "default") {
        if (defaultSkinRef !== null) defaultSkinRef.removeAttribute("hidden");
        if (customSkinRef !== null) customSkinRef.setAttribute("hidden", "");

        // Init Backgrounds
        // Change the Background image based on the date
        const backgrounds = getSkinBackgrounds();
        var day = new Date().getDate();
        var image = (day % backgrounds.length);
        var path = backgrounds[image];
        document.getElementsByClassName("background-image")[0].src = path;
    } else {
         if (customSkinRef !== null) customSkinRef.removeAttribute("hidden");
        if (defaultSkinRef !== null) defaultSkinRef.setAttribute("hidden", "");

        fetch("./src/data/skins.json")
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                var entry = json[i];
                skins[entry.name] = entry;
            }
        })
        // Load the custom skin
        .then(() => {
            if (skinSupport) {
                var skin = skins[currentSkin];
                if (skin !== undefined) {
                    fetch("./" + skin.file)
                    .then((response) => response.text())
                    .then((text) => {
                        customSkinRef.innerHTML = text;
                        // Cache and remove scripts
                        var scripts = [];
                        customSkinRef.querySelectorAll("script").forEach((script) => {
                            scripts.push(script.innerText);
                            script.remove();
                        });
                        // Add and execute scripts
                        scripts.forEach((scriptText) => {
                            var script = document.createElement("script");
                            script.innerText = scriptText;
                            customSkinRef.appendChild(script);
                        });
                    });
                } else {
                    console.error("Skin not found: " + currentSkin);
                }
            }

            // Init Backgrounds
            // Change the Background image based on the date
            const backgrounds = getSkinBackgrounds();
            var day = new Date().getDate();
            var image = (day % backgrounds.length);
            var path = backgrounds[image];
            document.getElementsByClassName("background-image")[0].src = path;
        });
    }
}

function getSkinBackgrounds() {
    var currentSkin = localStorage.getItem("skin") || "default";
    var skin = skins[currentSkin];
    if (skin !== undefined) {
        return skin.backgrounds;
    } else {
        console.warn("Skin not found: " + currentSkin + ", returning default backgrounds.");
        return [
            "src/img/backgrounds/background_1.jpg",
            "src/img/backgrounds/background_2.jpg",
            "src/img/backgrounds/background_3.jpg",
            "src/img/backgrounds/background_4.jpg"
        ];
    }
}

function delayedSkinValues(delay) {
    setTimeout(() => {
        updateSkinValues();
    }, delay);
}

function updateSkinValues() {
    if (localStorage.getItem("skin") !== null) {
        updateSkinType(localStorage.getItem("skin"), document.getElementById("skinType"), true);
    }
}

function updateSkinType(index, self, auto) {
    if(self !== null) self.value = index;

    localStorage.setItem("skin", index);

    if (!auto) addDialog("key.dialog.skin_reload.title", "key.dialog.skin_reload.content", true, "key.dialog.new_version.button",() => {
        location.reload(true);
    });
}