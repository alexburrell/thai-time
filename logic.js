$(document).ready(function() {
    updateAutomatically(true);
    $("#stop").click(function() {
        updateAutomatically(false);
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

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    $("#current-time").text(hour + ":" + minutes + ":" + seconds);
    $("#thai-time").text(thaiHour + " " + thaiMinutesTens + " " + thaiMinutesOnes + " " + thaiMinutesWord);
}
