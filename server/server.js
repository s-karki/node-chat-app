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

    //broadcast to only this socket
   socket.emit("newUser", {
    from: "admin",
    text: "Welcome to the Chat App!",
    createdAt: new Date().getTime()
   });

    //broadcast to everybody but this socket
   socket.broadcast.emit("newUser", {
    from: "admin",
    text: "A new user has joined.",
    createdAt: new Date().getTime()
   });


    socket.on("createMessage", (message) => { //listen for a custom event (msg), and emit it to every user
        console.log(message);

        //emit to all users
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    }); 

    socket.on("disconnect", () => console.log("Client disconnected")); //print statement is user disconnected
});  
//Connections are persistent; the client will try to reconnect. 
//Instant two-way connections become easy!


server.listen(port, () => console.log(`Server is up on port ${port}`)); //bind to a port

module.exports.app = app; 

