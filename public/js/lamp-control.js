function controlLamp(control) {
    switch (control.switch) {
        case "on":
            $('#main-container').removeClass("lamp-off");
            $('#main-container').addClass("lamp-on");
            break;
        case "off":
            $('#main-container').removeClass("lamp-on");
            $('#main-container').addClass("lamp-off");
            break;
        default:
            break;
    }
}

function updateLamps(control) {
    var lampIndex = lampsDiscovered.findIndex(lamp => lamp.id === control.id);
    if (lampIndex > -1) {
        lampsDiscovered[lampIndex].status = control.status;
        lampsDiscovered[lampIndex].lastUpdate = control.lastUpdate;
        updateRow(control);
    } else {
        lampsDiscovered.push(control);
        createRow(control);
    }
}

function createRow(lamp) {
	var row = $('<tr></tr>').attr('id', lamp.id).appendTo('#dynamicTable');
    $('<td></td>').addClass('col-md-3').text(lamp.id).appendTo(row);
    $('<td></td>').addClass('col-md-3').text(lamp.status).appendTo(row);
    $('<td></td>').addClass('col-md-3').text(lamp.lastUpdate).appendTo(row);
    var buttonOn = $('<input></input>').attr({'type': 'button', 'value': 'On'}).on('click', function() {sendOnMessage(lamp.id)});
    var buttonOff = $('<input></input>').attr({'type': 'button', 'value': 'Off'}).on('click', function() {sendOffMessage(lamp.id)});
    $('<td></td>').addClass('col-md-3').append(buttonOn).append(buttonOff).appendTo(row);
}

function updateRow(lamp) {
	$('#' + lamp.id).remove();
    createRow(lamp); 		 
}

function sendOnMessage(lamp) {
    var command = {
        "switch": "on"
    }

    sendCommandMessage(JSON.stringify(command), lamp);
}

function sendOffMessage(lamp) {
    var command = {
        "switch": "off"
    }

    sendCommandMessage(JSON.stringify(command), lamp);
}

function sendCommandMessage(command, lamp) {
    console.log("Sending : " + command + " to " + lamp);
    client.send(createMessage(command, mqtt_config.topic.lampada + lamp));
}