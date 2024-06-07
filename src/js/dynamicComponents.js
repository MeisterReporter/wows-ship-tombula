function createShipListItem(faction, tier, type, ship) {
    var html = '<input onchange="selectionChanged(\'' + ship + '\')" type="checkbox" checked /><img src="src/img/flag_' + faction + '.png"><span class="tier">' + tier + '</span><span class="class">' + type + '</span>' + ship;
    var item = document.createElement("li");
    item.setAttribute("ship", ship);
    item.innerHTML = html;
    // Mark Item as selected
    selectedItems[ship] = true;
    return item;
}