document.addEventListener("DOMContentLoaded", function(event) {
    var videoList = document.getElementById("video-list");

    createMenuItems();
    
    function createMenuItems(){
        for (var index = 0; index < videoData.length; index++) {
            var videoItem = videoData[index];
            
            var element = document.createElement("li");

            var anchor = document.createElement("a");
            anchor.setAttribute("href","#");
            anchor.setAttribute("data-code", videoItem.id);
            anchor.setAttribute("data-file", videoItem.file);
            anchor.innerHTML = videoItem.name;

            element.appendChild(anchor);

            videoList.appendChild(element);
        }

    }

    function clock() {
        var time = new Date(),
            hours = time.getHours(),
            minutes = time.getMinutes(),
            seconds = time.getSeconds(),
            year = time.getYear();

        if (year < 1000) {
            year += 1900;
        }

        //day of the week
        var dayOfWeek = time.getDay(),
            day = time.getDate(),
            month = time.getMonth();

        var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

        document.querySelectorAll('.clock')[0].innerHTML = leadzero(hours) + ":" + leadzero(minutes) + ":" + leadzero(seconds);
        document.querySelectorAll('.date')[0].innerHTML = dayarray[dayOfWeek] + ", " + montharray[month] + " " + " " + leadzero(day) + ", " + year;

        function leadzero(num) {
            if (num < 10) {
                num = '0' + num
            }
            return num;
        }
    }

    setInterval(clock, 1000);

    loadSavedData();

    var listItems = videoList.getElementsByTagName("li");

    for (var index = 0; index < listItems.length; index++) {
        var listItem = listItems[index];

        listItem.addEventListener("click", changeVideo());
    }

    document.getElementById("colorData").addEventListener("change", changeColor());

    function changeVideo(event) {
        return function(event) {
            var eTagName = event.target.tagName.toLowerCase();

            var anchor;
            if (eTagName == "a") {
                anchor = event.target;
            } else if (eTagName == "li") {
                anchor = event.target.getElementsByTagName("a")[0];
            } else {
                console.log("click event target unidentified - " + eTagName);
                return;
            }

            var videoFile = anchor.getAttribute("data-file");

            saveVideo(videoFile);

           changeToVideo(videoFile);
        }
    }

    function changeColor(event) {
        return function(event) {
            var color = event.target.value;

            saveColor(color);

            changeToColor(color);
        }
    }

    function changeToColor(color){
        if (color == "undefined" || color == null || color == "" || !color) {
            return;
        }

        var clockData = document.getElementById("clock");
        var dateData = document.getElementById("date");

        var cssColor = "color:#" + color + "; opacity: 0.51;";

        clockData.setAttribute("style", cssColor);
        dateData.setAttribute("style", cssColor);
    }

    function changeToVideo(videoFile){
        if (!videoFile || videoFile == null || videoFile == "" || videoFile == "undefined") {
            console.log("videoFile is not set");
            return;
        }

        var video = document.getElementById("bgvid");
        var source = document.getElementById("video-src-1");

        source.setAttribute("src", videoFile);

        video.load();
        video.play();
    }

    function saveColor(newColor){
        if (typeof(Storage) !== "undefined") {
            window.localStorage.color = newColor;
        }
        else
        {
            console.log("you cannot save color. html5 stoage not supported.")
        }
    }

    function saveVideo(newVideo){
        if (typeof(Storage) !== "undefined") {
            window.localStorage.video = newVideo;
        }
        else
        {
            console.log("you cannot save video. html5 stoage not supported.")
        }
    }

    function readSavedColor(){
        if (typeof(Storage) !== "undefined") {
            var newColor = "";
            
            if (window.localStorage.color !== "undefined" || window.localStorage.color != null || window.localStorage.color != "" || !window.localStorage.color){
                newColor = window.localStorage.color;
            }

            return newColor;
        }
        else
        {
            console.log("you cannot load saved color. html5 stoage not supported.")
        }
    }

    function readSavedVideo(){
        if (typeof(Storage) !== "undefined") {
            var newVideo = "";
            
            if (window.localStorage.video !== "undefined" || window.localStorage.video != null || window.localStorage.video != "" || !window.localStorage.video){
                newVideo = window.localStorage.video;
            }

            return newVideo;
        }
        else
        {
            console.log("you cannot load saved color. html5 stoage not supported.")
        }
    }

    function loadSavedData(){
        changeToColor (readSavedColor());
        changeToVideo (readSavedVideo());
    }
});