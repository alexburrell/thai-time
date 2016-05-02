$(document).ready(function() {
    updateTime();
    updateAutomatically(true);
    $("#manual").click(function() {
        updateAutomatically(false);
        var ampm = parseInt($("[name='ampm']").val()),
            hour = parseInt($("[name='hour']").val())+ampm,
            minutes = parseInt($("[name='minutes']").val());

        if (hour === 12) hour = 0;
        else if (hour === 24) hour = 12;

        displayTime(hour, minutes, 0);
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
        hour = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds();

    displayTime(hour, minutes, seconds);
}

function displayTime(hour, minutes, seconds) {
    var thaiHour = time["hours"][hour]["thai"],
        tens = Math.floor(minutes/10)*10,
        thaiMinutesTens = time["minutes"][tens]["thai"],
        thaiMinutesOnes = time["minutes"][minutes-tens]["thai"],
        thaiMinutesWord = time["words"]["minutes"]["thai"];

    if (minutes === 1) thaiMinutesOnes = time["minutes"]["01"]["thai"];
    if (minutes === 0) thaiMinutesWord = "";

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    $("#current-time").text(hour + ":" + minutes + ":" + seconds);
    $("#thai-time").text(thaiHour + " " + thaiMinutesTens + " " + thaiMinutesOnes + " " + thaiMinutesWord);
}
