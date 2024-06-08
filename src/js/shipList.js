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
        // Loop through JSON
        shipData = json;
        for (let i = 0; i < json.length; i++) {
            var ship = json[i];
            var shipItem = createShipListItem(ship.faction, ship.tier, ship.type, ship.name);
            list.appendChild(shipItem);
        }
    });
}

/**
 * The event will be triggered if a Ship changes its selection.
 * @param {*} ship The name of the ship
 */
function selectionChanged(ship) {
    selectedItems[ship] = !selectedItems[ship];
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
        if (ship.tier === tier) {
            if (self.checked && faction.checked && type.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
        }
    }
}

function changeFaction(faction, self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var type = document.getElementById(ship.type);
        if (ship.faction === faction && tier.checked && type.checked) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
        }
    }
}

function changeType(type, self) {
    var ul = document.getElementById("available-ships");
    var liItems = ul.getElementsByTagName('li');

    for (i = 0; i < liItems.length; i++) {
        var ship = shipData[i];
        var checkbox = liItems[i].getElementsByTagName("input")[0];
        var tier = document.getElementById(ship.tier);
        var faction = document.getElementById(ship.faction);
        if (ship.type === type && tier.checked && faction.checked) {
            if (self.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            selectedItems[ship.name] = checkbox.checked;
        }
    }
}