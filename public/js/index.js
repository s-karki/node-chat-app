var socket = io(); //init request and keep connection open

socket.on('connect', function()  {
console.log("Connected to server");
});//event name, callback function.
//As soon as the connection happens, the client prints this statement in the console, and the server prints its statement in its console. Cool!

//fire custom event (client to server)
// socket.emit("createMessage", {
//     from: "User",
//     text: "IamAMessage"
// });

socket.on("disconnect", function() {
    console.log("Disconnected from the server");
});
//if the server goes down/client disconnects

//custom event listener (event fired by server)
socket.on("newMessage", function(message){
    console.log(message);
});

socket.on("newUser", function(message){
    console.log(message);
});

