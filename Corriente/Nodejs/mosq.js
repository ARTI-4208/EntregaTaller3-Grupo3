var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline
var mqtt = require('mqtt')
topic='current';

var serialPort = new SerialPort('COM3', {
  baudRate: 57600
})
var client  = mqtt.connect('mqtt://172.28.128.3:1883');

var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
  console.log("Data received: " + data + " - "+ new Date());
  client.publish(topic, data);
})

serialPort.on('open', function () {
  console.log('Communication is on!')
})