var mqtt_config = {
    topic: {
        lampada: 'iluminacao/cidade/area/',
        discovery: 'discovery/#'
    },
    host: {
        name: 'iot.eclipse.org',
        port: '443'
    }
}

var lampsDiscovered = [];
var dynamicTable;