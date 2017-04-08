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

function key_exists(){
    movies_db.once("value",function(snapshot){
	if(!snapshot.hasChild(key)){
	    window.location.replace("/");
	}
    });
}
var key = getKey();
key_exists();
   
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
	var rat_overall = snap.val().overall_rating;
	if (rat_overall == null){
	    rat_overall = "-";
	} else {
	    rat_overall += "/10";
	}			
	var rat_race = snap.val().average_race_rating;
	if (rat_race == null){
	    rat_race = "-";
	} else {
	    rat_race += "/10";
	}
	var rat_gender = snap.val().average_gender_rating;
	if (rat_gender == null){
	    rat_gender = "-";
	} else {
	    rat_gender += "/10";
	}
	change_vals(title,img_src,rat_overall,rat_race,rat_gender,date);
    });
}

get_vals(key);

/****** firebase **********/
    function writeRace() {
		var numRating = $('#race_options :selected').text();
		var reviewText = $('#race_explanation').val();

		const reference = movies_db.child(key);
		const overallRating = reference.child("overall_rating");
		const allRatings = reference.child("race_rating");
		const avgRaceRating = reference.child("average_race_rating");
		const review = reference.child("reviews");

		allRatings.push(numRating);
		review.push(reviewText); 

		allRatings.once("value", function(snapshot) {		  
		  var avgRaceRatingValue = 0;
		  var numChildren = snapshot.numChildren();

		  snapshot.forEach(function(child) {
		    avgRaceRatingValue += parseInt(child.val());
		  });

		  avgRaceRatingValue = (avgRaceRatingValue * 1.0) / numChildren;
		  avgRaceRating.set(Math.round(avgRaceRatingValue * 100) / 100);

		  reference.on("value", function(snapshot) {
		  	var overallRatingValue = 0;
		  	var movie = snapshot.val();

		  	if (movie.average_gender_rating != null) {
		  		overallRatingValue = (movie.average_gender_rating + movie.average_race_rating) / 2.0;
		  	} else {
		  		overallRatingValue = movie.average_race_rating;
		  	}

		  	overallRating.set(Math.round(overallRatingValue * 100) / 100);
			});
   	 	});
	    
             $("#reviewDivs").append('<div class="row">'+ reviewText +'</div>');
	     location.reload(false);
	}

    function writeGender() {
		var numRating = $('#gender_options :selected').text();
	    	var reviewText = $('#gender_explanation').val();
	    
	   	const reference = movies_db.child(key);
	        const overallRating = reference.child("overall_rating");
		const allRatings = reference.child("gender_rating");
		const avgGenderRating = reference.child("average_gender_rating");
	    	const review = reference.child("reviews");

		allRatings.push(numRating);
	    	review.push(reviewText); 

		allRatings.once("value", function(snapshot) {
		  var avgGenderRatingValue = 0;
		  var numChildren = snapshot.numChildren();

		  snapshot.forEach(function(child) {
		    avgGenderRatingValue += parseInt(child.val());
		  });

		  avgGenderRatingValue = (avgGenderRatingValue * 1.0) / numChildren;
		  avgGenderRating.set(Math.round(avgGenderRatingValue * 100) / 100);

		  reference.on("value", function(snapshot) {
		  	var overallRatingValue = 0;
		  	var movie = snapshot.val();

		  	if (movie.average_race_rating != null) {
		  		overallRatingValue = (movie.average_gender_rating + movie.average_race_rating) / 2.0;
		  	} else {
		  		overallRatingValue = movie.average_gender_rating;
		  	}	
			
			overallRating.set(Math.round(overallRatingValue * 100) / 100);
			});
   	 	});
	    
	     $("#reviewDivs").append('<div class="row">'+ reviewText +'</div>');
	     location.reload(false);
    }

var submit = document.getElementById('race_rating');
submit.onclick = writeRace;

submit = document.getElementById('gender_rating');
submit.onclick = writeGender;

