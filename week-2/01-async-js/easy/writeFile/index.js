const fs = require('fs');

const data = "This is data to be write inside the a.txt file";

fs.writeFile("a.txt", data, (err) => {
    if (err) {
        console.log("error",err);
    }
    else {
        console.log("data successfully written to a.txt file");
    }
})