let selectedItems = [];
let shipData = [];
let typeCounts = { "SS": 0, "DD": 0, "CL": 0, "CA": 0, "BC": 0, "BB": 0, "CV": 0 };

function initializeList(callback = null) {
    // Get List
    var list = document.getElementById("available-ships");
    list.innerHTML = "";
    // Get JSON
    fetch("./src/data/ships.json")
        .then((response) => response.json())
        .then((json) => {
            // Sort the JSON
            json.sort(function (a, b) {
                return a.faction.localeCompare(b.faction) || tierToNumber(a.tier) - tierToNumber(b.tier) || typeToNumber(a.type) - typeToNumber(b.type);
            });
            // Loop through JSON
            shipData = json;
            for (let i = 0; i < json.length; i++) {
                var ship = json[i];
                var shipItem = createShipListItem(ship.faction, ship.tier, ship.type, ship.name);
                list.appendChild(shipItem);
                selectedItems[ship.name] = ship.attr !== "test";
                if (ship.attr === "test") {
                    var checkBox = shipItem.getElementsByTagName("input")[0];
                    checkBox.checked = false;
                }
                if (ship.premium === "true") {
                    list.childNodes[list.childNodes.length - 1].getElementsByTagName("shipName")[0].classList.add("premium");
                }
                // Count ship classes
                typeCounts[ship.type] += 1;
            }

            loadSelection();
            if (callback != null) {
                callback();
            }
        });
}

function tierToNumber(tier) {
    switch (tier) {
        case "I":
            return 1;
        case "II":
            return 2;
        case "III":
            return 3;
        case "IV":
            return 4;
        case "V":
            return 5;
        case "VI":
            return 6;
        case "VII":
            return 7;
        case "VIII":
            return 8;
        case "IX":
            return 9;
        case "X":
            return 10;
        case "★":
            return 11;
        default:
            return 0;
    }
}

function typeToNumber(type) {
    switch (type) {
        case "SS":
            return 0;
        case "DD":
            return 1;
        case "CL":
            return 2;
        case "CA":
            return 3;
        case "BC":
            return 4;
        case "BB":
            return 5;
        case "CV":
            return 6;
        default:
            return -1;
    }
}

/**
 * The event will be triggered if a Ship changes its selection.
 * @param {*} ship The name of the ship
 */
function selectionChanged(ship) {
    selectedItems[ship] = !selectedItems[ship];
    // Save Selection
    localStorage.setItem(ship, selectedItems[ship]);
}

/**
 * This function will filter the list by the ships name
 */
function searchByName() {
    // Declare variables
    var input = document.getElementById("search");
    var search = input.value.toUpperCase();
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < liItems.length; i++) {
        txtValue = liItems[i].textContent || liItems[i].innerText;
        if (txtValue.toUpperCase().indexOf(search) > -1) {
            liItems[i].style.display = "";
        } else {
            liItems[i].style.display = "none";
        }
    }
}

function changeTier(tier, self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var faction = document.getElementById(ship.faction);
        var type = document.getElementById(ship.type);
        var testShip = document.getElementById("testShips");
        var premium = document.getElementById("premiumShips");
        var research = document.getElementById("techShips");
        if (ship.tier === tier) {
            if (self.checked && faction.checked && type.checked && (testShip.checked || ship.attr !== "test") && (premium.checked || ship.premium !== "true") && (research.checked || ship.premium !== "false")) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
            // Save Selection
            localStorage.setItem(ship.name, checkbox.checked);
        }
    }

    // Save State
    localStorage.setItem(tier, self.checked);
}

function changeFaction(faction, self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var type = document.getElementById(ship.type);
        var testShip = document.getElementById("testShips");
        var premium = document.getElementById("premiumShips");
        var research = document.getElementById("techShips");
        if (ship.faction === faction && tier.checked && type.checked && (testShip.checked || ship.attr !== "test") && (premium.checked || ship.premium !== "true") && (research.checked || ship.premium !== "false")) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
            // Save Selection
            localStorage.setItem(ship.name, checkbox.checked);
        }
    }

    // Save State
    localStorage.setItem(faction, self.checked);
}

function changeType(type, self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var faction = document.getElementById(ship.faction);
        var testShip = document.getElementById("testShips");
        var premium = document.getElementById("premiumShips");
        var research = document.getElementById("techShips");
        if (ship.type === type && tier.checked && faction.checked && (testShip.checked || ship.attr !== "test") && (premium.checked || ship.premium !== "true") && (research.checked || ship.premium !== "false")) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
            // Save Selection
            localStorage.setItem(ship.name, checkbox.checked);
        }
    }

    // Save State
    localStorage.setItem(type, self.checked);
}

function enableTestShip(self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var faction = document.getElementById(ship.faction);
        var type = document.getElementById(ship.type);
        var premium = document.getElementById("premiumShips");
        var research = document.getElementById("techShips");
        if (ship.attr === "test" && tier.checked && faction.checked && type.checked && (premium.checked || ship.premium !== "true") && (research.checked || ship.premium !== "false")) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
            // Save Selection
            localStorage.setItem(ship.name, checkbox.checked);
        }
    }

    // Save State
    localStorage.setItem("enableTestShips", self.checked);
}

function enablePremiumShip(self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var faction = document.getElementById(ship.faction);
        var type = document.getElementById(ship.type);
        var testShip = document.getElementById("testShips");
        if (ship.premium === "true" && tier.checked && faction.checked && type.checked && (testShip.checked || ship.attr !== "test")) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
            // Save Selection
            localStorage.setItem(ship.name, checkbox.checked);
        }
    }

    // Save State
    localStorage.setItem("enablePremiumShips", self.checked);
}

function enableTechShip(self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var faction = document.getElementById(ship.faction);
        var type = document.getElementById(ship.type);
        var testShip = document.getElementById("testShips");
        if (ship.premium === "false" && tier.checked && faction.checked && type.checked && (testShip.checked || ship.attr !== "test")) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
            // Save Selection
            localStorage.setItem(ship.name, checkbox.checked);
        }
    }

    // Save State
    localStorage.setItem("enableTechShips", self.checked);
}

function loadSelection() {
    // Load List Selection
    for (let i = 0; i < shipData.length; i++) {
        var ship = shipData[i];
        var checked = localStorage.getItem(ship.name);
        if (checked !== null) {
            var checkBox = document.querySelector('[ship="' + ship.name + '"]').childNodes[0];
            if (checked === "true") {
                checkBox.checked = true;
                selectedItems[ship.name] = true;
            } else {
                checkBox.checked = false;
                selectedItems[ship.name] = false;
            }
        } else {
            localStorage.setItem(ship.name, selectedItems[ship.name]);
        }
    }
    // Load Filters
    var filters = document.getElementsByClassName("filter-list");
    // Load Tier Selection
    var tiers = filters[0].getElementsByTagName("input");
    for (let i = 0; i < tiers.length; i++) {
        var tier = tiers[i];
        var name = tier.id;
        var value = localStorage.getItem(name);
        if (value !== null) {
            if (value === "true") {
                tier.checked = true;
            } else {
                tier.checked = false;
            }
        } else {
            tier.checked = true;
            localStorage.setItem(name, tier.checked);
        }
    }
    // Load faction selection
    var factions = filters[1].getElementsByTagName("input");
    for (let i = 0; i < factions.length; i++) {
        var faction = factions[i];
        var name = faction.id;
        var value = localStorage.getItem(name);
        if (value !== null) {
            if (value === "true") {
                faction.checked = true;
            } else {
                faction.checked = false;
            }
        } else {
            faction.checked = true;
            localStorage.setItem(name, faction.checked);
        }
    }
    // Load type selection
    var types = filters[2].getElementsByTagName("input");
    for (let i = 0; i < types.length; i++) {
        var type = types[i];
        var name = type.id;
        var value = localStorage.getItem(name);
        if (value !== null) {
            if (value === "true") {
                type.checked = true;
            } else {
                type.checked = false;
            }
        } else {
            type.checked = true;
            localStorage.setItem(name, type.checked);
        }
    }
    // Load Premium Ships selection
    var premiumShipsEnabled = filters[3].getElementsByTagName("input")[0];
    var value = localStorage.getItem("enablePremiumShips");
    if (value !== null) {
        if (value === "true") {
            premiumShipsEnabled.checked = true;
        } else {
            premiumShipsEnabled.checked = false;
        }
    } else {
        premiumShipsEnabled.checked = true;
        localStorage.setItem("enablePremiumShips", premiumShipsEnabled.checked);
    }
    // Load Premium Ships selection
    var techShipsEnabled = filters[3].getElementsByTagName("input")[1];
    var value = localStorage.getItem("enableTechShips");
    if (value !== null) {
        if (value === "true") {
            techShipsEnabled.checked = true;
        } else {
            techShipsEnabled.checked = false;
        }
    } else {
        techShipsEnabled.checked = true;
        localStorage.setItem("enableTechShips", techShipsEnabled.checked);
    }
    // Load test ships selection
    var testShipsEnabled = filters[3].getElementsByTagName("input")[2];
    var value = localStorage.getItem("enableTestShips");
    if (value !== null) {
        if (value === "true") {
            testShipsEnabled.checked = true;
        } else {
            testShipsEnabled.checked = false;
        }
    } else {
        testShipsEnabled.checked = false;
        localStorage.setItem("enableTestShips", testShipsEnabled.checked);
    }
}

function applyClassCounts(container) {
    setTimeout(() => {
        for (let i = 0; i < Object.keys(typeCounts).length; i++) {
            var key = Object.keys(typeCounts)[i];
            var count = typeCounts[key];
            var elements = container.getElementsByTagName("span");
            for (let element of elements) {
                if (element.innerHTML == key) {
                    element.innerHTML = count;
                    break;
                }
            }
        }
    }, 500);
}

function countSelectedShips() {
    var count = 0;
    for (let i = 0; i < shipData.length; i++) {
        if (selectedItems[shipData[i].name]) {
            count++;
        }
    }

    return count;
}