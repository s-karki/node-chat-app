const path = require("path");
const publicPath = path.join(__dirname, "../public"); //easier way to access public folder, using path, a module that comes with Node


const express = require("express");
const port = process.env.PORT || 3000; 

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => console.log(`Server is up on port ${port}`)); //bind to a port

module.exports.app = app; 

