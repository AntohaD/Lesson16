const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const port = 3000;

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.render(__dirname + '/views/layout.pug');
});

let users = 0;

io.on('connection', function(socket) {
    users++;    
    console.log('client has been conneted just now');
    console.log(users);

    socket.on('input value', function(value) {
        // console.log(value);

        io.sockets.emit('input value', value);
    });

    socket.on('disconnect', function () {
        console.log('client has been diconnected just now');
    });
});

http.listen(port, function() {
    console.log(`Started listen port ${port}`);
});