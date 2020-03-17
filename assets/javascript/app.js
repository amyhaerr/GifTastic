$(document).ready(function () {

    // variable to contain selected tv shows
    var topics = ["Supernatural", "The Flash", "Arrow", "The Chilling Adventures of Sabrina", "Doctor Who", "The Mandolorian"]


    // function to display Television Show info from the API

    function displayInfo() {
        $("#televison-view").empty();
        var televisionShow = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZMDyyJt0yDpWObBq4SEvE8f8YENUS7fz&q=" + televisionShow + "&limit=10&offset=0&rating=PG&lang=en";

        // call on AJAX for info
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                if (response.pagination.total_count == 0) {
                    var itemIndex = topics.indexOf(televisionShow);
                    
                    if (itemIndex > -1) {
                        topics.splice(itemIndex, 1);
                        renderButtons();
                        
                    }
                }
                // save response from API call to a variable
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var newShows = $("<div class='television-name'>");
                    var gifRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                    var gifTitle = $("<p>").text("Title:  " + results[i].title.toUpperCase());
                    var gifURL = results[i].images.fixed_height_still.url;
                    var gif = $("<img>");
                    gif.attr("src", gifURL);
                    gif.attr("data-still", results[i].images.fixed_height_still.url);
                    gif.attr("data-animate", results[i].images.fixed_height.url);
                    gif.attr('data-state', 'still');
                    gif.addClass('animate-gif');


                    newShows.append(gifRating);
                    newShows.append(gifTitle);
                    newShows.append(gif);

                    $("#television-view").prepend(newShows);
                    
                }

            });
    };
    function renderButtons() {
        $(".buttons-view").empty();

        for (var j = 0; j < topics.length; j++) {
            var makeButtons = $('<button>');
            makeButtons.addClass('televisionShow btn btn-info');
            makeButtons.attr('data-name', topics[j]);
            makeButtons.text(topics[j]);
            $('.buttons-view').append(makeButtons);
        }
    }
    function removeButtons() {
        $("#television-view").empty();
        var televisionShow = $(this).attr('data-name');
        var itemIndex = topics.indexOf(televisionShow);
        if (itemIndex > -1) {
            topics.splice(itemIndex, 1)
            renderButtons();
        }

    }

    // function to play or still GIF image

    function gifPlay() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');

        }
    }

    // event listeners
    $("#add-show").on("click", function (event) {
        event.preventDefault();

        var tvShow = $("#inputText").val().trim();

        if (topics.toString().toLowerCase().indexOf(tvShow.toLowerCase()) != -1) {
        }
        else {
            topics.push(tvShow);
            renderButtons();
        }
    });

    // click tv button to display Gifs and info from API

    $(document).on("click", ".btn-info", displayInfo);

    // click to animate or still a GIF
    $(document).on("click", ".animate-gif", gifPlay);
    renderButtons();


});

