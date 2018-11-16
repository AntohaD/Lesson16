const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

let users = 0;

io.on('connection', function (socket) {
    users++;
    console.log('client has been connected just now');
    console.log(users);

    socket.on('input value', function(value) {
        // console.log(value);
        socket.emit('input value', input.value);
    });

    socket.on('disconnect', function () {
        console.log('client has been diconnected just now');
    });
});

http.listen(port, function() {
    console.log(`Started listening on port ${port}`);
});