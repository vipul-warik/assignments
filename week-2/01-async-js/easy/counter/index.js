let date;
setInterval(() => {
    date = new Date();
    document.getElementById('counter').innerHTML = date.toString().slice(16,24);
},1000)