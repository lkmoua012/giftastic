// Begin Document Ready
$(function() {

    var topics = [
        "donnie yen",
        "jackie chan",
        "chuck norris",
        "neo anderson",
        "john wick",
        "jet li",
        "tony jaa",
        "jean claude van damme",
        "sylvester stallone",
    ];

    function buttonGifs(){

        $("#gifButtons").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("actor-btn btn btn-info");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);

            $("#gifButtons").append(a);

        }

    };
    
    function displayGifs() {
    
        var actor = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LoBZFiPXwM7NZowjkwleAImc7tMGfyUh&q=" + actor + "&rating=PG-13&limit=10";
    
        $.ajax({

          url: queryURL,
          method: "GET"

        }).then(function(response) {

            $("#gifArea").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var actorDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var actorImage = $("<img>");

                actorImage.attr({
                    src: results[i].images.fixed_height_still.url,
                    "data-state": "still",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    class: "gif"
                });

                actorDiv.append(p);
                actorDiv.append(actorImage);

                $("#gifArea").prepend(actorDiv);

            };

        });
    
    };

    function gifAnimate() {

        var state = $(this).attr("data-state");
    
            if (state === "still") {
    
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
    
            } else {
    
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };
    
    };

    function addActor(){

        var newActor = $("#actor-input").val().toLowerCase().trim();

        console.log(newActor);

        if (topics.indexOf(newActor) > -1){
            alert("This entry is already listed.")

            $(this).closest("form").find("input[type=text], textarea").val("");

            return false;

        } else {

            if (newActor === "") {

                alert("Please input a valid entry.");
    
                return false;
    
            };

            topics.push(newActor);
        
            buttonGifs();

            $(this).closest("form").find("input[type=text], textarea").val("");

        };

    };

    buttonGifs();

    $(document).on("click", ".actor-btn", displayGifs);
    $(document).on("click", ".gif", gifAnimate);
    $(document).on("click", "#add-actor", addActor);

// End of Document Ready
});

