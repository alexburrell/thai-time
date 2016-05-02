$(document).ready(function() {
    updateTime();
    updateAutomatically(true);
    $("#manual").click(function() {
        updateAutomatically(false);
        var ampm = parseInt($("[name='ampm']").val()),
            hours = parseInt($("[name='hour']").val())+ampm,
            minutes = parseInt($("[name='minutes']").val());

        if (hours === 12) hours = 0;
        else if (hours === 24) hours = 12;

        displayTime(hours, minutes, 0);
    });
    $("#live").click(function() {
        updateTime();
        updateAutomatically(true);
    });
});

var interval = null;
function updateAutomatically(shouldUpdate) {
    if (shouldUpdate) interval = setInterval(updateTime, 1000);
    else clearInterval(interval);
}

function updateTime() {
    var now = new Date(),
        hours = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    displayTime(hours, minutes, seconds);
}

function displayTime(hours, minutes, seconds) {
    var thaiHour = time["hours"][hours]["thai"],
        tens = Math.floor(minutes/10)*10,
        thaiMinutesTens = time["minutes"][tens]["thai"],
        thaiMinutesOnes = time["minutes"][minutes-tens]["thai"],
        thaiMinutesWord = time["words"]["minutes"]["thai"],
        ampm = "AM";

    if (minutes === 1) thaiMinutesOnes = time["minutes"]["01"]["thai"];
    if (minutes === 0) thaiMinutesWord = "";

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if (hours >= 12) {
        hours = hours-12;
        ampm = "PM"
    }
    if (hours === 0) hours = "12"

    // $("#current-time").text(hour + ":" + minutes + ":" + seconds);
    $("#current-time").text(hours + ":" + minutes + " " + ampm);
    $("#thai-time").text(thaiHour + " " + thaiMinutesTens + " " + thaiMinutesOnes + " " + thaiMinutesWord);
}
