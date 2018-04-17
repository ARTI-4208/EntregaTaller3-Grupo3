// Dependencias

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");


// Servicio GET (usando express)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Al momento de existir conexión se ejecuta la función de callback
io.on('connection', function(socket){

    // Emite (publica) en el tópico 'stream' los datos que se publican en redis
	var sub = redis.createClient();
	sub.subscribe("voltage");
	sub.on("message", function (channel, message) {
		console.log('SocketIO receive: ' + message);
		io.emit('stream', message);
	});
	
});


http.listen(3000, function(){
  console.log('Servidor en el puerto 3000');
});