const refreshTime = 20; // in minutes
const aniTransTimes = 50;
// FUNCTION TO UPDATE SCHEDULE/REQUESTS
function update(parameters) {
    if (parameters) {
        parameters.update = true;
    }
    else {
        parameters = { update: true };
    }
    // FADE TABLE WHILE UPDATING
    $("#mainContainer").addClass("updating");
    $.get("/", parameters, function (data) {
        // SET NEW SCHEDULE TO CONTAINER
        $("#mainContainer").html(data);
        // RESETTING SCHEDULE/REQUESTS BUTTONS
        $("#gotoRequests").removeClass("active");
        $("#gotoSchedule").addClass("active");
        // BRING BACK FOCUS TO TABLE
        $("#mainContainer").removeClass("updating");
    });
}
$(document).ready(function () {
    const updateInterval = setInterval(update, refreshTime * 60 * 1000);
    $("#requests").hide();
    setTimeout(function () {
        $(".alert").hide(150);
    }, 7500);
    let yScrollPos = undefined;
    // CHANGING LOCATION
    $("#location").on("click", function () {
        const parameters = {
            location: $(this).data("location")
        };
        $(".alert").hide();
        update(parameters);
    });
    // CHANGING TO REQUESTS
    $("#gotoRequests").on("click", function () {
        $("#gotoSchedule").removeClass("active");
        $(this).addClass("active");
        yScrollPos = window.pageYOffset;
        $("#schedule").hide();
        $("#requests").show(aniTransTimes, function () {
            $(window).scrollTop(yScrollPos);
        });
    });
    // CHANGING TO SCHEDULE
    $("#gotoSchedule").on("click", function () {
        $("#gotoRequests").removeClass("active");
        $(this).addClass("active");
        yScrollPos = window.pageYOffset;
        $("#requests").hide();
        $("#schedule").show(aniTransTimes, function () {
            $(window).scrollTop(yScrollPos);
        });
    });
});
//# sourceMappingURL=shifts.js.map