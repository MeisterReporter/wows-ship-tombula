var accessToken = "";
var expiresAt = "";
var accountID = "";

function requestLogin() {
    window.open("https://api.worldoftanks.eu/wot/auth/login/?application_id=b66933cb847d03be5e5b1763471d8f41&display=page&redirect_uri=" + document.URL, "_self");
}

function checkLogin() {
    const params = new URLSearchParams(document.URL);
    if (params.has("status")) {
        const status = params.get("status");
        const pAccessToken = params.get("access_token");
        const pExpiresAt = params.get("expires_at");
        const pAccountID = params.get("account_id");
        const nickname = params.get("nickname");
        // Check Response
        if (status === "ok" && new Date(pExpiresAt * 1000) >= new Date()) {
            accessToken = pAccessToken;
            expiresAt = pExpiresAt;
            accountID = pAccountID;
            document.getElementById("login").attributes.removeNamedItem("translatable");
            document.getElementById("login").innerHTML = nickname;
            document.getElementById("login").onclick = null;
            // TODO: Maybe remove this
            if (window.history.replaceState) {
                //prevents browser from storing history with each change:
                window.history.replaceState(null, "", document.URL.split("?")[0]);
            }
            // Load the Ships
            getShipData();
        } else {
            addDialog("key.dialog.loginfail.title", "key.dialog.loginfail.content", true);
        }
    }
}

function getShipData() {
    // Contacting Player Data - WoWs API
    addDialog("key.dialog.loading.title", "key.dialog.loading.content", true);
    var url = "https://api.worldofwarships.eu/wows/account/info/?application_id=b66933cb847d03be5e5b1763471d8f41&account_id=" + accountID + "&access_token=" + accessToken + "&extra=private.port";
    console.log("Contacting: " + url);
    $.get(url, (data, status) => {
        if (status === "success") {
            var private = Object.values(data)[2][accountID].private;
            var port = private.port;
            var list = document.getElementById("available-ships");
            var checkboxes = list.getElementsByTagName("input");
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
            for (let i = 0; i < shipData.length; i++) {
                selectedItems[shipData[i].name] = false;
            }
            console.log(port.length);
            for (let i = 0; i < port.length; i++) {
                var id = port[i];
                // Contacting Warshisp - WoWs API
                var url = "https://api.worldofwarships.eu/wows/encyclopedia/ships/?application_id=b66933cb847d03be5e5b1763471d8f41&ship_id=" + id;
                const finalIndex = i;
                const finalID = id;
                $.get(url, (data, status) => {
                    if (status === "success") {
                        var shipData = Object.values(Object.values(data)[2])[0];
                        if (shipData !== null) {
                            var shipName = shipData.name;
                            console.log(shipData.ship_id + " " + shipName);
                            // Update checkboxes
                            var search = document.querySelector("[ship=\"" + shipName + "\"]");
                            if (search !== null) {
                                var checkbox = search.childNodes[0];
                                checkbox.checked = true;
                                selectedItems[shipName] = true;
                                localStorage.setItem(shipName, selectedItems[shipName]);
                            }
                        } else {
                            console.log("Ship Data is empty " + finalID);
                        }
                        if (finalIndex == port.length - 1) {
                            // Done
                            closeDialog();
                        }
                    }
                });
            }
        } else {
            closeDialog();
        }
    });
}