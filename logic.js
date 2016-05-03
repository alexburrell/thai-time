var currentHours = 0,
    currentMinutes = 0;

$(document).ready(function() {
    updateTime();
    updateAutomatically(true);
    $("#live").click(function() {
        updateTime();
        updateAutomatically(true);
    });

    $("#add-hour").click(function() {
        updateAutomatically(false);
        var newHours = currentHours + 1;
        if (newHours === 24) newHours = 0;
        displayTime(newHours, currentMinutes, 0);
    });

    $("#subtract-hour").click(function() {
        updateAutomatically(false);
        var newHours = currentHours - 1;
        if (newHours === -1) newHours = 23;
        displayTime(newHours, currentMinutes, 0);
    });

    $("#add-minute-ten").click(function() {
        updateAutomatically(false);
        var newMinutes = currentMinutes + 10;
        if (newMinutes >= 60) newMinutes = newMinutes - 60;
        displayTime(currentHours, newMinutes, 0);
    });

    $("#subtract-minute-ten").click(function() {
        updateAutomatically(false);
        var newMinutes = currentMinutes - 10;
        if (newMinutes <= 0) newMinutes = newMinutes + 60;
        displayTime(currentHours, newMinutes, 0);
    });

    $("#add-minute-one").click(function() {
        updateAutomatically(false);
        var newMinutes = currentMinutes + 1;
        if (newMinutes >= 60) newMinutes = 0;
        displayTime(currentHours, newMinutes, 0);
    });

    $("#subtract-minute-one").click(function() {
        updateAutomatically(false);
        var newMinutes = currentMinutes - 1;
        if (newMinutes <= 0) newMinutes = 59;
        displayTime(currentHours, newMinutes, 0);
    });

    $("#add-ampm, #subtract-ampm").click(function() {
        updateAutomatically(false);
        var newHours = currentHours + 12;
        if (newHours >= 24) newHours = newHours - 24;
        displayTime(newHours, currentMinutes, 0);
    });

    $("#hide-transcription").click(function() {
        toggleTranscriptions();
    });
    $("#hide-colors").click(function() {
        toggleColors();
    });

    $("#hide-transcription").click();
    $("#hide-colors").click();
});

var showHideText = ["Hide", "Show"];
function toggleTranscriptions() {
    $("#transcribed-time").toggleClass("transcription-hidden");
}
function toggleColors() {
    $("body").toggleClass("hide-colors");
}

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
    currentHours = hours;
    currentMinutes = minutes;

    var thaiHour = time["hours"][hours]["thai"],
        tens = Math.floor(minutes/10)*10,
        thaiMinutesTens = time["minutes"][tens]["thai"],
        thaiMinutesOnes = time["minutes"][minutes-tens]["thai"],
        thaiMinutesWord = time["words"]["minutes"]["thai"],
        ampm = "AM";

    var thaiHourTranscribed = time["hours"][hours]["transcribed"],
        thaiMinutesTensTranscribed = time["minutes"][tens]["transcribed"],
        thaiMinutesOnesTranscribed = time["minutes"][minutes-tens]["transcribed"],
        thaiMinutesWordTranscribed = time["words"]["minutes"]["transcribed"];

    var minutesWordNotes = time["words"]["minutes"]["notes"];

    if (minutes === 1) thaiMinutesOnes = time["minutes"]["01"]["thai"];
    if (minutes === 0) {
        thaiMinutesWord = "";
        thaiMinutesWordTranscribed = "";
        minutesWordNotes = "";
    }

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if (hours >= 12) {
        hours = hours-12;
        ampm = "PM"
    }
    if (hours === 0) hours = "12";

    minutes = minutes+"";

    // $("#current-time").text(hour + ":" + minutes + ":" + seconds);
    // $("#current-time").html(htmlH(hours) + ":" + htmlM(minutes) + " " + htmlH(ampm));
    $("#current-hour").html(htmlH(hours));
    $("#current-minutes-ten").html(htmlM(minutes[0]));
    $("#current-minutes-one").html(htmlM(minutes[1]));
    $("#current-ampm").html(htmlH(ampm));
    $("#thai-time").html(htmlH(thaiHour) + htmlM(thaiMinutesTens) + htmlM(thaiMinutesOnes) + htmlW(thaiMinutesWord));
    $("#transcribed-time").html(htmlH(thaiHourTranscribed) + " " + htmlM(thaiMinutesTensTranscribed) + " " + htmlM(thaiMinutesOnesTranscribed) + " " + htmlW(thaiMinutesWordTranscribed));

    $("#notes-content").html(htmlW(minutesWordNotes));
}

function htmlH(hours) {
    return "<span class='hours'>" + hours + "</span>";
}

function htmlM(minutes) {
    return "<span class='minutes'>" + minutes + "</span>";
}

function htmlW(word) {
    return "<span class='word'>" + word + "</span>";
}
