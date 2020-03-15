$(document).ready(function () {


var televisionShows = ["Supernatural", "Friends", "The Flash", "Arrow", "The Chilling Adventures of Sabrina", "Doctor Who", "Legacy"]    


// function to display Television Show info from the API

function display() {
    $("#televison-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + televisionShows + "api_key=ZMDyyJt0yDpWObBq4SEvE8f8YENUS7fz&q=&limit=10&offset=0&rating=PG&lang=en";

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response){
    if (response.pagination.total_count ===0) {
        var itemIndex = televisionShows.indexOf(topic);
        if (itemIndex > -1) {
            renderButtons();
        }
    }
   
   
    });




}









})
