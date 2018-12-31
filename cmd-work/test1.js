
console.log("i am test1");
let info = require("./test1-import");
var fs = require("fs");
// console.log("age>>>", info);
 
// Asynchronous read
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous read: " + data.toString());
});

console.log("here")