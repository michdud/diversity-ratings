const movies_db = firebase.database().ref('movies');

var sPageURL = window.location.search.substring(1);
var key = new RegExp('[\?]key=');


/*
credit:https://www.sitepoint.com/url-parameters-jquery/
*/
var getKey = function(){
    var results = new RegExp('[\?&]key=%22([^&#]*)%22').exec(window.location.href);
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
var firebaseRef = new Firebase(url);

    function writeRace() {
		var numRating = $(‘#race_rating’).val();

		movies_db.child(key).set({race_rating: numRating});
		evt.preventDefault();
    }

    function writeGender() {
		var numRating = $(‘#gender_rating’).val();
	    	
		movies_db.child(key).set({gender_rating: numRating});
		evt.preventDefault();
    }

var submit = document.getElementById('race_rating');
submit.onclick = writeRace;

submit = document.getElementById('gender_rating');
submit.onclick = writeGender;

