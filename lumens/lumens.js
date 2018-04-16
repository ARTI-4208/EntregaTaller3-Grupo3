var cinco = require("johnny-five");
var circuito = new cinco.Board();

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://ec2-54-233-74-62.sa-east-1.compute.amazonaws.com');

var bombillo, celda, luz;


client.on('connect', function () {
  client.publish('lumens', 'Connect to Arduino-NodeJS-Mosquitto-Bridge-Kafka-ConsumerRedis-SocketIO');
  circuito.on("ready", prender);
});

function prender()
{
  var configuracion = {pin:"A0", freq: 50};
  celda = new cinco.Sensor(configuracion);

  bombillo = new cinco.Led(13);
  bombillo.off();
  mensajear();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  while(true){
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function mensajear()
{
  luz = celda.value;
  console.log("Luz: " + luz + " - " + new Date());
  luzchar = "" + luz;
  if(luz > 800)
  {
	  bombillo.off();
  }
  else
  {
	  bombillo.on();
  }
  client.publish('lumens', luzchar);
  setTimeout(mensajear, 1000);
}
