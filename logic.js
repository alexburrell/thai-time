$(document).ready(function() {
    setInterval(updateTime, 1000);
});

function updateTime() {
    var now = new Date(),
        hour = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    var thaiHour = time["hours"][hour]["thai"],
        tens = Math.floor(minutes/10),
        thaiMinutesTens = time["minutes"]["tens"][tens]["thai"],
        thaiMinutesOnes = time["minutes"]["ones"][minutes-tens]["thai"];

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    $("#current-time").text(hour + ":" + minutes + ":" + seconds);
    $("#thai-time").text(thaiHour + " " + thaiMinutesTens + " " + thaiMinutesOnes);
}
