var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
var Kafka   = require('no-kafka');
var producer = new Kafka.Producer();


console.log('start service bridge');
// Connection to topic locate in mosquitto
client.on('connect', function () {
    client.subscribe('locate');
    console.log('connected to mosquitto');
    startReceiverMosquitto()
});

function startReceiverMosquitto(){
    client.on('message', function (topic, message) {
        console.log(topic +": "+message.toString());
        try {
           publishKafka(topic, message.toString())
        }
        catch(err) {
           console.log(err)
           console.log("Error sending message to kafka")
        }
    });
}

function publishKafka(topic, msg){
    producer.init().then(function(){
        console.log('Publish to kafka '+msg+' in topic '+topic);
        return producer.send({
            connectionString: '127.0.0.1:9092',
            topic: topic,
            partition: 0,
            message: {
                value: msg
            }
        });
    });
}
