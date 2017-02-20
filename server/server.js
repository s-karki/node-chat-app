const path = require("path");
const publicPath = path.join(__dirname, "../public"); //easier way to access public folder, using path, a module that comes with Node
const socketIO = require("socket.io");
const http = require("http");

const express = require("express");
const port = process.env.PORT || 3000; 

var app = express();
var server = http.createServer(app); //config server to use SocketIO
var io = socketIO(server); //adds client-side JS


app.use(express.static(publicPath));


io.on('connection', (socket)=>{ //register an event listener (listen for a new connection).
    console.log("User connected");

    socket.on("disconnect", () => console.log("Client disconnected")); //print statement is user disconnected
});  
//Connections are persistent; the client will try to reconnect. 
//Instant two-way connections become easy!


server.listen(port, () => console.log(`Server is up on port ${port}`)); //bind to a port

module.exports.app = app; 

