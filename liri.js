require("dotenv").config();
var Twitter = require("twitter")
var Spotify = require('node-spotify-api');
const fs = require("fs");

const keys = require("./keys.js");

function Spotify(x, y){
	this.id = x;
	this.secret = y;
}

function Twitter(x, y, z, a){
	this.consumer_key = x;
	this.consumer_secret = y;
	this.access_token = z;
	this.access_secret = a;
}

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let commands = process.argv[2];
let parameter = process.argv[3];

// Twitter and Spotify functions
const spot = function(){

	if(parameter === undefined){
			parameter = 'I want it that way';
		}

	spotify.search({ type: 'track', query: parameter}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  let newData = data.tracks.items
	  for (i = 0; i < newData.length; i++){
	  	console.log(newData[i].duration_ms);
	  }
	});
}

const twit = function(){
	let params = {screen_name: '@vmi0805'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	      return console.log(error);
	    }
	  if (!error) {
	  	for (i = 0; i < tweets.length; i++){
			  	console.log('~~~~~~~~~~~~~~~')
			    console.log(tweets[i].text);
			    console.log(tweets[i].created_at);
			   	console.log('~~~~~~~~~~~~~~~')
	  	}
	  }
	});
}

// App logic
switch(commands){
	case 'my-tweets':
		twit();
	break;
	case 'spotify-this-song': 
		spot();
	break;
	case 'movie-this':

		// Need to add in the OMDB API



	break;
	case 'do-what-it-says':

		// Need to add in the read from random.txt file and reuse the spotify function spot()


	break;
}






