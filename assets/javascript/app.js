var manufacture = ["Ford", "Chevy"];
var buttonView = $(".buttons-view")
manufacture.forEach(element => {
  var button = $("<button>")
  button.text(element)
  buttonView.append(button)
})
buttonView.on("click", function(event) {
  console.log(event)
  displayManufactureInfo(event, event.target.innerText)
})
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayManufactureInfo(event, search) {
  event.preventDefault();
  var manufacture = $(".search-input").val();
  console.log(manufacture);
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KcC4hwqgw0RWEi2NIHpBI48QHvGowwmt&q=" + search || manufacture;

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
// Creating a div to hold the movie
console.log(response)
var manufDiv = $(".gif-view");

response.data.forEach(element => {
  console.log(element)
  var gifImage = $("<img src=" + element.images.original.url +" >")
  manufDiv.append(gifImage)
});
// Displaying the rating
manufDiv.append(pOne);

// Retrieving the URL for the image
var imgURL = response.Poster;

// Creating an element to hold the image
var image = $("<img>").attr("src", imgURL);

// Appending the image
manufDiv.append(image);

// Putting the entire movie above the previous movies
$("#manufacture-view").prepend(manufDiv);
});

}

// Function for displaying movie data
function renderButtons() {

// Deleting the movies prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of movies
for (var i = 0; i < manufacture.length; i++) {

// Then dynamicaly generating buttons for each movie in the array
// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
var a = $("<button>");
// Adding a class of movie-btn to our button
a.addClass("manufacture-btn");
// Adding a data-attribute
a.attr("data-name", manufacture[i]);
// Providing the initial button text
a.text(manufacture[i]);
// Adding the button to the buttons-view div
$("#buttons-view").append(a);
}
}

// This function handles events where a movie button is clicked
$("#add-manufacture").on("click", function(event) {
event.preventDefault();
// This line grabs the input from the textbox
var manufacture = $("#movie-input").val().trim();

// Adding movie from the textbox to our array
manufactures.push(manufacture);

// Calling renderButtons which handles the processing of our movie array
renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".add-search", displayManufactureInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

