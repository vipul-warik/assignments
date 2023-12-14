let date;

    function Time(){

    setTimeout(() => {
        date = new Date();
        document.getElementById("counter").innerHTML = date.toString().slice(16,24);
        Time();
    },1000)

    }

Time();