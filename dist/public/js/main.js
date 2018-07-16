const aniTransTimes = 50;
$(document).ready(function () {
    $("#requests").hide();
    let yScrollPos = undefined;
    $("#location").on("click", function () {
        const parameters = {
            location: $(this).data("location"),
            update: true
        };
        $("#schedule").addClass("updating");
        $("#requests").addClass("updating");
        $(".alert").hide();
        $.get("/", parameters, function (data) {
            $("#mainContainer").html(data);
            $("#gotoRequests").removeClass("active");
            $("#gotoSchedule").addClass("active");
            $("#schedule").removeClass("updating");
            $("#requests").removeClass("updating");
        });
    });
    $("#gotoRequests").on("click", function () {
        $("#gotoSchedule").removeClass("active");
        $(this).addClass("active");
        yScrollPos = window.pageYOffset;
        $("#schedule").hide();
        $("#requests").show(aniTransTimes, function () {
            $(window).scrollTop(yScrollPos);
        });
    });
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
//# sourceMappingURL=main.js.map