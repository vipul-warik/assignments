const fs = require('fs');

let fileRawData;

let p = new Promise((resolve, reject) => {
    fs.readFile("a.txt","utf8",(err,data) => {
        fileRawData = data;
        resolve(fileRawData);
        console.log("file data fetched");
    });
});

p.then((data) => {
    let wordArr = data.toString().split(" ");
    let cleanedData = "";

    wordArr.forEach((word) => {
        if(word.trim()){
            cleanedData += " "+word.trim();
        }
    })

    fs.writeFile("a.txt", cleanedData.trim(), (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("file cleaned sussessfully");
        }
    });
})




