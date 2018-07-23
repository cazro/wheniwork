const refreshTime = 60; // in minutes
const aniTransTimes = 50;


function update(parameters: any): void {
    
    if (parameters) {
        parameters.update = true;
    } else {
        parameters = {update: true};
    }
    
    $("#mainContainer").addClass("updating");
    
    $.get("/", parameters, function(data: string) {
        $("#mainContainer").html(data);
            
        $("#gotoRequests").removeClass("active");
        $("#gotoSchedule").addClass("active");

        $("#mainContainer").removeClass("updating");
       
    });
}

$(document).ready(function() {
    
    const updateInterval = setInterval(update, refreshTime * 60 * 1000);
    
    $("#requests").hide();
    
    let yScrollPos: number = undefined;
    
    $("#location").on("click", function() {
        const parameters = {
            location: $(this).data("location")
        };
        
        $(".alert").hide();
        
        update(parameters);
    });
    
    $("#gotoRequests").on("click", function() {
        $("#gotoSchedule").removeClass("active");
        $(this).addClass("active");
        
        yScrollPos = window.pageYOffset;
        
        $("#schedule").hide();
        $("#requests").show(aniTransTimes, function() {
            $(window).scrollTop(yScrollPos);
        });
    });
    
    $("#gotoSchedule").on("click", function() {
        $("#gotoRequests").removeClass("active");
        $(this).addClass("active");
        
        yScrollPos = window.pageYOffset;
        
        $("#requests").hide();
        $("#schedule").show(aniTransTimes, function() {
            $(window).scrollTop(yScrollPos);
        });
        
    });
    
    
});