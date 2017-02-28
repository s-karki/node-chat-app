//client side 
var socket = io(); //init request and keep connection open



socket.on('connect', function ()  {
console.log("Connected to server");
});//event name, callback function.
//As soon as the connection happens, the client prints this statement in the console, and the server prints its statement in its console. Cool!



socket.on("disconnect", function () {
    console.log("Disconnected from the server");
});
//if the server goes down/client disconnects

//custom event listener (event fired by server)
socket.on("newMessage", function (message) {
    console.log(message);
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    //render to DOM
    jQuery("#messages").append(li);

});

socket.on("newUser", function (message) {
    console.log(message);
});


jQuery("#message-form").on("submit", function (e) {
    e.preventDefault(); //prevent default behavior (page refresh)

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val() //select form input with jquery
    }, function () {

    });
});

