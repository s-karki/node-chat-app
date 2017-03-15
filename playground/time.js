var moment = require("moment");


var date = moment();
date.add(14, "year").subtract(4, "months");

console.log(date.format("MMMM Do, YYYY"));

var newDate = moment(); 

console.log(newDate.format("h:mm a"));

