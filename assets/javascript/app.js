// Variables
giphyObj = {
    topics: [
    	"Maroon 5", 
    	"Linkin Park",
    	"Jay-z",
    	"Coldplay", 
    	"Biggie", 
    	"Beyonce", 
    	"Musiq Soulchild", 
    	"Drake",
    	"Taylor Swift", 
    	"Wu-tang Clan",
    	"Jennifer Lopez",
    	"Chris Brown"
    	],


	 
    // Functions
    buildButtons: function() {


        $('#buttonsView').empty();
        // Loops through the array of movies
        for (var i = 0; i < this.topics.length; i++) {
        	console.log("This is the topics object: " + this.topics);
            var buildButton = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            buildButton.attr('class', ' waves-effect waves-light btn black darken-1 z-depth-3 star'); // Added a class 
            buildButton.attr('data-name', this.topics[i]); // Added a data-attribute
            buildButton.text(this.topics[i]); // Provided the initial button text
            console.log("the button element: " + JSON.stringify(buildButton));

            // append the div to buttonsview
            $('#buttonsView').append(buildButton);
        }
    },

    displayStarInfo: function() {
    	// API DATA
    	var star = $(this).data('name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + star + "&api_key=yGPJsnSo4YXS4Z35ea2Nvdjq9wQ5vd6f&limit=20";

        // Ajax call
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
            	// Website logs
                console.log("This is the API response: " + JSON.stringify(response));

            	//Sets the variable results = the entire data set coming from the API
            	var results = response.data; 

            	// Empties the buttons view  before adding a new buttons
            	$('#gifsAppearHere').empty();
 
			    var $gifs = $('#gifsAppearHere');
			    // Targeting the underscore template housed in the html
			    var $giphyTemplate = _.template($('#giphyTmpl').html());
			    results.forEach(function(result) {
            		$gifs.prepend($giphyTemplate({result: result }));
        		});


			});
		}	


}
$(document).ready(function() {
	

//button is clicked
	$('#addStar').on('click', function() {

	    var star = $('#star-input').val().trim();
	    console.log("The input typed: " + star);
	    // the star chosen is pushed to the topics array
	    giphyObj.topics.push(star);

	    giphyObj.buildButtons();

	    return false;
	});
	$(document).on('click', '.star', giphyObj.displayStarInfo);
		console.log(this);
	
	// This handles the animation of the GIF.
	$(document.body).on('click', '.card-image img', function() {
		console.log("Picture Click: " + this);
		
		
		var state = $(this).attr('data-state');
		
		if (state === 'still'){
			var animateUrl = $(this).attr('data-animate');
			$(this).attr('src', animateUrl);
			$(this).attr('data-state', 'animate');
			console.log(state);


		}
		
		else {
			var animateUrl = $(this).attr('data-still');
			$(this).attr('src', animateUrl);
			$(this).attr('data-state', 'still');
		}


	});
	$('#buttonsView').empty();
	giphyObj.buildButtons();


});




