var Kafka   = require('no-kafka');
var consumer = new Kafka.SimpleConsumer();
var redis = require("redis"),
    pub = redis.createClient();

console.log('start consumer service');

var dataHandler = function (messageSet, topic, partition) {
    messageSet.forEach(function (m) {
        console.log("Publish to redis: " + m.message.value.toString('utf8') + " from topic " + topic);
		pub.publish(topic, m.message.value.toString('utf8'));
    });
};

return consumer.init().then(function () {
	
    return consumer.subscribe('voltage', dataHandler);
});