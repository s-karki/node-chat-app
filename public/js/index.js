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

    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html(); //script tag is a template in index.html
    var html = Mustache.render(template, {
        text: message.text,
        createdAt: formattedTime,
        from: message.from
    });
    jQuery("#messages").append(html);


});

socket.on("newUser", function (message) {
    console.log(message);
});

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html(); //template for location messages
    var html = Mustache.render(template, {
        url: message.url,
        createdAt: formattedTime,
        from: message.from
    }); //render sends over the data to the template, and injects it in the right position (dictated by key)

    jQuery("#messages").append(html);

});

var messageTextBox = jQuery('[name=message]');

jQuery("#message-form").on("submit", function (e) {
    e.preventDefault(); //prevent default behavior (page refresh)

    socket.emit("createMessage", {
        from: "User",
        text: messageTextBox.val() //select form input with jquery
    }, function () {
        messageTextBox.val('')
    }); //callback function is the second argument
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert("Your browser does not support Geolocation");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition(function (pos) {

        locationButton.removeAttr("disabled").text("Send location.");
        socket.emit("createLocationMessage", {
            latitude:  pos.coords.latitude,
            longitude: pos.coords.longitude
        });
    }, function () {
        locationButton.removeAttr("disabled").text("Send location.");
        alert("Unable to retrieve your position");

    });
});



