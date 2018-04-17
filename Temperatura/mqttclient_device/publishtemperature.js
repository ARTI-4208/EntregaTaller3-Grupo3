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
	client.subscribe('temperature');
	
	setInterval(sendData, 1000);
    //client.end();

});


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  //client.end()
})

function sendData(){
	var tmpCelsius= Math.random()*100;

	//client.publish('numbers', tmpCelsius.toString() );
	var data = {device_id:'1', date:new Date().getTime(), value:tmpCelsius};
	client.publish('temperature', JSON.stringify(data) );
	console.info("Publish in mosquitto: " + JSON.stringify(data));
	
}
	






/** test mosquito**/
/*
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

*/
