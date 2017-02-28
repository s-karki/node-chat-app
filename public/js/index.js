//client side 
var socket = io(); //init request and keep connection open



socket.on('connect', function ()  {
console.log("Connected to server");
});//event name, callback function.
//As soon as the connection happens, the client prints this statement in the console, and the server prints its statement in its console. Cool!



socket.on("disconnect", function () {
    console.log("Disconnected from the server");
}); //if the server goes down/client disconnects

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

socket.on("newLocationMessage", function (message) {
    var li = jQuery("<li></li>");

    var a = jQuery("<a target='_blank'>I am here.</a>"); //open link in a new tab (this is an anchor tag template)
    
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);

    jQuery("#messages").append(li);

});

jQuery("#message-form").on("submit", function (e) {
    e.preventDefault(); //prevent default behavior (page refresh)

    socket.emit("createMessage", {
        from: "User",
        text: jQuery("[name=message]").val() //select form input with jquery
    }, function () {

    }); //callback function
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("Your browser does not support Geolocation");
    }

    navigator.geolocation.getCurrentPosition(function (pos) {
        socket.emit("createLocationMessage", {
            latitude:  pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function () {
        alert("Unable to retrieve your position");
    });
});



