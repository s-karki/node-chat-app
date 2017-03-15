const path = require("path");
const publicPath = path.join(__dirname, "../public"); //easier way to access public folder, using path, a module that comes with Node
const socketIO = require("socket.io");
const http = require("http");

const express = require("express");
const port = process.env.PORT || 3000; 
const {generateMessage, generateLocationMessage} = require("./utils/message");

var app = express();
var server = http.createServer(app); //config server to use SocketIO
var io = socketIO(server); //adds client-side JS


app.use(express.static(publicPath));


io.on('connection', (socket)=>{ //register an event listener (listen for a new connection).
    console.log("User connected");

    //broadcast to only this socket
   socket.emit("newMessage", generateMessage("admin", "Welcome to the Chat App."));

    //broadcast to everybody but this socket
   socket.broadcast.emit("newMessage", generateMessage("admin", "A new user has joined."));


    socket.on("createMessage", (message, callback) => { //listen for a custom event (msg)
        console.log(message);
        io.emit("newMessage", generateMessage(message.from, message.text));   //emit the message to all users
        callback();

    }); 

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("User", coords.latitude, coords.longitude));

    });


    socket.on("disconnect", () => console.log("Client disconnected")); //print statement is user disconnected
});  


//Connections are persistent; the client will try to reconnect. 
//Instant two-way connections become easy!


server.listen(port, () => console.log(`Server is up on port ${port}`)); //bind to a port

module.exports.app = app; 

