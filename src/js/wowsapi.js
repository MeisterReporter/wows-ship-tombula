var accessToken = "";
var expiresAt = "";
var accountID = "";

const domainEndings = {
    NA: "com",
    EU: "eu",
    ASIA: "asia"
}

function getWoWsDomain() {
    return localStorage.getItem("wowsAPIDomain");
}

function setWoWsDomain(domain) {
    localStorage.setItem("wowsAPIDomain", domain);
}

function requestLogin() {
    addDialog("key.dialog.chooseserver.title", "key.dialog.chooseserver.content", true, "key.dialog.chooseserver.confirm", () => {
        var servers = document.getElementsByName("server");

        var selected = "error";
        for (i = 0; i < servers.length; i++) {
            if (servers[i].checked) {
                selected = servers[i].value;
            }
        }

        if (selected !== "error") {
            setWoWsDomain(domainEndings[selected]);
            window.open("https://api.worldoftanks." + getWoWsDomain() + "/wot/auth/login/?application_id=b66933cb847d03be5e5b1763471d8f41&display=page&redirect_uri=" + document.URL, "_self");
        } else {
            // Requesting again softlocks the page
            /*setTimeout(() => {
                requestLogin();
            }, 500);*/
        }
    });
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
    var url = "https://api.worldofwarships." + getWoWsDomain() + "/wows/account/info/?application_id=b66933cb847d03be5e5b1763471d8f41&account_id=" + accountID + "&access_token=" + accessToken + "&extra=private.port";
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
                localStorage.setItem(shipData[i].name, selectedItems[shipData[i].name]);
            }
            console.log(port.length);
            for (let i = 0; i < port.length; i++) {
                var id = port[i];
                // Contacting Warshisp - WoWs API
                var url = "https://api.worldofwarships." + getWoWsDomain() + "/wows/encyclopedia/ships/?application_id=b66933cb847d03be5e5b1763471d8f41&ship_id=" + id;
                const finalIndex = i;
                const finalID = id;
                var hasErrorShips = false;
                var errorShips = [];
                $.get(url, (data, status) => {
                    if (status === "success") {
                        var gotShipData = Object.values(Object.values(data)[2])[0];
                        if (gotShipData !== null) {
                            var shipName = gotShipData.name;
                            console.log(gotShipData.ship_id + " " + shipName + " => OK");
                            // Update checkboxes
                            var ship = null;
                            for (var entry of shipData) {
                                if (entry.name == shipName) {
                                    ship = entry;
                                    break;
                                }
                            }
                            if (ship !== null) {
                                var search = document.querySelector("[ship=\"" + shipName + "\"]");
                                var tier = document.getElementById(ship.tier);
                                var faction = document.getElementById(ship.faction);
                                var type = document.getElementById(ship.type);
                                var testShip = document.getElementById("testShips");
                                var premium = document.getElementById("premiumShips");
                                var research = document.getElementById("techShips");
                                if (search !== null && tier.checked && faction.checked && type.checked && (testShip.checked || ship.attr !== "test") && (premium.checked || ship.premium !== "true") && (research.checked || ship.premium !== "false")) {
                                    var checkbox = search.childNodes[0];
                                    checkbox.checked = true;
                                    selectedItems[shipName] = true;
                                    localStorage.setItem(shipName, selectedItems[shipName]);
                                }
                            }
                        } else {
                            console.log(finalID + " Unknown => ERROR");
                            hasErrorShips = true;
                            errorShips.push(finalID);
                        }
                        if (finalIndex == port.length - 1) {
                            // Done
                            closeDialog();
                            setTimeout(() => {
                                if (hasErrorShips) {
                                    addDialog("key.dialog.errorships.title", "key.dialog.errorships.content", true);
                                    setTimeout(() => {
                                        var dialogContent = document.getElementsByClassName("dialog-content")[0];
                                        var issues = "";
                                        for (let i = 0; i < errorShips.length; i++) {
                                            if (i > 0) {
                                                issues += ", ";
                                            }
                                            issues += errorShips[i];
                                        }
                                        dialogContent.querySelector("#issues").innerHTML = issues;
                                    }, 50);
                                }
                            }, 500);
                        }
                    }
                });
            }
        } else {
            closeDialog();
        }
    });
}