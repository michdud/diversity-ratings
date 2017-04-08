const movies_db = firebase.database().ref('movies');

var sPageURL = window.location.search.substring(1);
var key = new RegExp('[\?]key=');


/*
credit:https://www.sitepoint.com/url-parameters-jquery/
*/
var getKey = function(){
    var results = new RegExp('[\?&]key=([^&#]*)').exec(window.location.href);
    if (results == null){
	window.location.replace("/");
    }
    return results[1] || 0;
}

var key = getKey();
/****** Setting up Page *************/
function parse_date(release_date) {

    var months = ["January", "February", "March", "April", "May", "June",        "July", "August", "September", "October", "November", "December"];
    var monthNum = parseInt(release_date.substring(5,7)) - 1;
    var day = parseInt(release_date.substring(8,10));
    var year = release_date.substring(0,4);
    return months[monthNum] + " " + day.toString() + ", " + year;
}

function change_vals(title,img_src,rat_overall,rat_race,rat_gender,date){
    var title;
    var img_src;
    var rat_overall;
    var rat_race;
    var rat_gender;
    var date;
    rat_overall = "Overall Rating: " + rat_overall;
    rat_race = "Racial Diversity: " + rat_race;
    rat_gender = "Gender Diversity: " + rat_gender;
    console.log(title);
    $("img").attr("src",img_src);
    $(".movie_title").text(title);
    $(".release_date").text(date);
    $(".rating_overall").text(rat_overall);
    $(".rating_race_diversity").text(rat_race);
    $(".rating_gender_representation").text(rat_gender);
}

function get_vals(id){
        //movies_db.once("value").then(function(snapshot){
    //	var snap = snapshot.child(id);
    movies_db.child(id).once("value", function(snap){ 
	var title = snap.val().title;
	var img_src = snap.val().poster_path;
	img_src = "https://image.tmdb.org/t/p/w1280" + img_src;
	var date = snap.val().release_date;
	date = parse_date(date);
	var rat_overall = "100%";//childSnapshot.val().
	var rat_race = "100%";//childSnapshot.val().
	var rat_gender = "100%";//childSnapshot.val().;
	change_vals(title,img_src,rat_overall,rat_race,rat_gender,date);
    });
}

get_vals(key);

/****** firebase **********/
    function writeRace() {
		var numRating = $('#race_options :selected').text();

		const reference = movies_db.child(key);
		const overallRating = reference.child("overall_rating");
		const allRatings = reference.child("race_rating");
		const avgRaceRating = reference.child("average_race_rating");

		allRatings.push(numRating);

		allRatings.once("value", function(snapshot) {
		  var avgRaceRatingValue = 0;
		  var numChildren = snapshot.numChildren();

		  snapshot.forEach(function(child) {
		    avgRaceRatingValue += parseInt(child.val());
		  });

		  avgRaceRatingValue = (avgRaceRatingValue * 1.0) / numChildren;
		  avgRaceRating.set(avgRaceRatingValue);

		  reference.on("value", function(snapshot) {
		  	var overallRatingValue = 0;
		  	var movie = snapshot.val();

		  	if (movie.average_gender_rating != null) {
		  		overallRatingValue = (movie.average_gender_rating + movie.average_race_rating) / 2.0;
		  	}

		  	overallRating.set(overallRatingValue);
			});
   	 	});
	}

    function writeGender() {
		var numRating = $('#gender_options :selected').text();
	    
	   	const reference = movies_db.child(key);
	    const overallRating = reference.child("overall_rating");
		const allRatings = reference.child("gender_rating");
		const avgGenderRating = reference.child("average_gender_rating");

		allRatings.push(numRating);

		allRatings.once("value", function(snapshot) {
		  var avgGenderRatingValue = 0;
		  var numChildren = snapshot.numChildren();

		  snapshot.forEach(function(child) {
		    avgGenderRatingValue += parseInt(child.val());
		  });

		  avgGenderRatingValue = (avgGenderRatingValue * 1.0) / numChildren;
		  avgGenderRating.set(avgGenderRatingValue);

		  reference.on("value", function(snapshot) {
		  	var overallRatingValue = 0;
		  	var movie = snapshot.val();

		  	if (movie.average_race_rating != null) {
		  		overallRatingValue = (movie.average_gender_rating + movie.average_race_rating) / 2.0;
		  	}

		  	overallRating.set(overallRatingValue);
			});
   	 	});
    }

var submit = document.getElementById('race_rating');
submit.onclick = writeRace;

submit = document.getElementById('gender_rating');
submit.onclick = writeGender;

