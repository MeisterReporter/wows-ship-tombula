function createShipListItem(faction, tier, type, ship) {
    var html = '<input ship=\'' + ship + '\' onchange="selectionChanged(\'' + ship + '\')" type="checkbox" checked /><img src="src/img/flag_' + faction + '.png"><span class="tier">' + tier + '</span><span class="class">' + type + '</span>' + '<shipName>' + ship + '</shipName>';
    var item = document.createElement("li");
    item.setAttribute("ship", ship);
    item.innerHTML = html;
    // Mark Item as selected
    selectedItems[ship] = true;
    return item;
}