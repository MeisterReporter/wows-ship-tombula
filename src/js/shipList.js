let selectedItems = [];
let shipData = [];

function initializeList() {
    // Get List
    var list = document.getElementById("available-ships");
    list.innerHTML = "";
    // Get JSON
    fetch("./src/data/ships.json")
    .then((response) => response.json())
    .then((json) => {
        // Sort the JSON
        json.sort(function(a, b) {
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
        }

        loadSelection();
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
        if (ship.tier === tier) {
            if (self.checked && faction.checked && type.checked && (testShip.checked || ship.attr !== "test")) {
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
        if (ship.faction === faction && tier.checked && type.checked && (testShip.checked || ship.attr !== "test")) {
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
        if (ship.type === type && tier.checked && faction.checked && (testShip.checked || ship.attr !== "test")) {
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
        if (ship.attr === "test" && tier.checked && faction.checked && type.checked) {
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
    // Load test ships selection
    var testShipsEnabled = filters[3].getElementsByTagName("input")[0];
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

function openFilterList(self) {
    var inputs = self.getElementsByTagName("input");
    var labels = self.getElementsByTagName("label");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].style["display"] === "none") {
            inputs[i].style["display"] = "inline";
        } else {
            inputs[i].style["display"] = "none";
        }
    }
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].style["display"] === "none") {
            labels[i].style["display"] = "inline";
        } else {
            labels[i].style["display"] = "none";
        }
    }
}