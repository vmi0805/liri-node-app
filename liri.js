require("dotenv").config();
var Twitter = require("twitter")
var Spotify = require('node-spotify-api');
const fs = require("fs");
const request = require("request");

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
const spot = function(x){

	if(x === undefined){
			x = 'The Sign';
		}

	spotify.search({ type: 'track', query: x}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	  const items = data.tracks.items;

	  // console.log(JSON.stringify(items, null, 2))

	  for (i = 0; i < items.length; i++){
		  	console.log('~~~~~~~~~~~~~~~~')
		  	console.log(items[i].artists[0].name);
		  	console.log(items[i].name);
		  	console.log(items[i].album.name);
		  	console.log(items[i].external_urls.spotify);
		  	console.log('~~~~~~~~~~~~~~~~')
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

//OMDB API
const OMDB = function(){

	if(x === undefined){
			x = 'Mr. Nobody';
		}

	let movieName = process.argv[3];

	const queryUrl = "http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=trilogy";

		console.log(queryUrl);

		request(queryUrl, function(error, response, body) {

		  // If the request is successful
		  if (!error && response.statusCode === 200) {

		  	const dataNew = JSON.parse(response.body, null, 2);

		  	// console.log(dataNew);

		  	console.log('~~~~~~~~~~~~~~~~~')
		  	console.log('->' + dataNew.Title);
		  	console.log('->' + dataNew.Year);
		  	console.log('->' + dataNew.Rated);
		  	console.log(dataNew.Ratings);		  	
		  	console.log('->' + dataNew.Country);	
		  	console.log('->' + dataNew.Language);	
		  	console.log('->' + dataNew.Plot);	
		  	console.log('->' + dataNew.Actors);	
		  	console.log('~~~~~~~~~~~~~~~~~')
		  }
		});
}

const doit = function(){

		fs.readFile("random.txt", "utf8", function(error, data) {

		  if (error) {
		    return console.log(error);
		  }

		  const dataArr = data.split(",");
		  
		  let doitCommand = dataArr[0];
		  let whattodo = dataArr[1];

		  console.log(doitCommand)


		  switch(doitCommand){
	  	    	case 'my-tweets':
					twit();
					//ok
				break;
				case 'spotify-this-song': 
					spot(whattodo);
				break;
				case 'movie-this':
					OMDB(whattodo);
				break;
				case 'do-what-it-says':
					doit();
				break;
		  }

		});
}

// App logic
switch(commands){
	case 'my-tweets':
		twit();
	break;
	case 'spotify-this-song': 
		spot(parameter);
	break;
	case 'movie-this':
		OMDB(parameter);
	break;
	case 'do-what-it-says':
		doit();
	break;
}






