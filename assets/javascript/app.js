$(document).ready(function () {


var televisionShows = ["Supernatural","The Flash", "Arrow", "The Chilling Adventures of Sabrina", "Doctor Who", "Legacy", "The Mandolorian"]    


// function to display Television Show info from the API

function displayInfo() {
    $("#televison-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ZMDyyJt0yDpWObBq4SEvE8f8YENUS7fz&q" + televisionShows + "=&limit=10&offset=0&rating=PG&lang=en";

    $.ajax ({
        url: queryURL,
        method: "GET"
    })
    
    .then(function(response){

    if (response.pagination.total_count ===0) {
        var itemIndex = televisionShows.indexOf(topic);
        if (itemIndex > -1) {
            topic.splice(itemIndex, 1);
            renderButtons();
        }
    }
   var results = repsonse.data;
   for(var i = 0; j<results.length; i++){
       var newShows = $("<div class='television-name'>");
       var gifRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
        var gifTitle = $("<p>").text("Title:  " + results[i].title.toUpperCase());
        var gif = $("<img>");
        gif.attr("src", gifURL);
        gif.attr("data-still", results[i].images.fixed_height_still.url);
        gif.attr("data-animate", resultsi[i].images.fixed_heigth.url);
        gif.attr('data-state', 'still');
        gif.addClass('animate-gif');
   
   
        newShows.append(gifRating);
        newShows.append(gifTitle);
        newShows.append(gif);

        $("#television-view").prepend(newShows);
    }
   
    });

    function renderButtons(){
        $(".button-view").empty();

      for (var i = 0; i < televisionShows.length; i++){
          var makeButtons =$('<button>');
          makeButtons.addClass('televisionShows btn btn-info');
          makeButtons.attr('data-name', televisionShows[i]);
          $('.buttons-view').append(makeButtons); 
      }  
    }


}









})
