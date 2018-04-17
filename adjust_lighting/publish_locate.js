var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');

function sleep(milliseconds) {
  var start = new Date().getTime();
  while(true){
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

client.on('connect', function () {

   var tmplength = Math.random() * (2000 - 1) + 1

   for(var i=0;i<tmplength;i++)
    {
        var tmpCelsius= Math.random() * (100 - 1) + 1

        client.publish('locate', tmpCelsius.toString() );

        console.info("Publish in mosquitto: " + volt + " - " + new Date());
		sleep(1000);
    }
    client.end();

});





