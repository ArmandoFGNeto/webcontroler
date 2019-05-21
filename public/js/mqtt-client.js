var clientId = Math.random().toString(36).substring(2, 15);

var client = new Paho.Client(mqtt_config.host.name, Number(mqtt_config.host.port), clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect, useSSL: true, reconnect: true });

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    setSubscriptions();
}

function setSubscriptions() {
    client.subscribe(mqtt_config.topic.discovery);
}

function createMessage(content, topic) {
    var message = new Paho.Message(content);
    message.destinationName = topic;
    return message;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);

    if (message.destinationName.startsWith('discovery')) {
        updateLamps(JSON.parse(message.payloadString));
    }
}