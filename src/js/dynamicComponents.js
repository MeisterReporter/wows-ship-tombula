if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

function createShipListItem(faction, tier, type, ship) {
    var html = '<input ship=\'' + ship + '\' onchange="selectionChanged(\'' + ship + '\')" type="checkbox" checked /><img src="src/img/flag_' + faction + '.png"><span class="tier">' + tier + '</span><span class="class">' + type + '</span>' + '<shipName>' + ship + '</shipName>';
    var item = document.createElement("li");
    item.setAttribute("ship", ship);
    item.innerHTML = html;
    // Mark Item as selected
    selectedItems[ship] = true;
    return item;
}

function createNautyMessage(ship, img, message, distance) {
    var html = '<div class="nauty-message"><img src="{0}"><div><span>{1} <span translatable>key.nauty_message_1</span> {2} <span translatable>key.nauty_message_2</span></span><p>{3}</p></div><a onclick="removeNautyMesssage()">x</a></div>'
                .format(img, ship, distance, message);
    return html;
}