const fs = require("fs");

fs.readFile("a.txt", "utf-8" , (err,data) => {
    console.log(data);
});

console.log("before loop started");

let a=0;
for(let i=0;i<10000000000;i++) {
a++;
}

console.log("after loop finished");