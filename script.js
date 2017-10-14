function clock() {
    var time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds(),
    year = time.getYear();

    if (year < 1000)
    {
        year += 1900;
    }

    var day = time.getDay(),
    month = time.getMonth();
    
    var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

    document.querySelectorAll('.clock')[0].innerHTML = leadzero(hours) + ":" + leadzero(minutes) + ":" + leadzero(seconds);
    document.querySelectorAll('.date')[0].innerHTML = dayarray[day] + ", " + montharray[month] + " " + " " + leadzero(day) + ", " + year;
  
    function leadzero(num) {
        if (num < 10) {
            num = '0' + num
        }
        return num;
    }
}

setInterval(clock, 1000);
