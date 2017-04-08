const movies_db = firebase.database().ref('movies');

    function writeRace() {
		var numRating = $('#race_options :selected').text();

		movies_db.child('121856').child("race_rating").set(numRating);
    }

    function writeGender() {
		var numRating = $('#gender_options :selected').text();
	    	
		movies_db.child('121856').child("gender_rating").set(numRating);

    }

var submit = document.getElementById('race_rating');
submit.onclick = writeRace;

submit = document.getElementById('gender_rating');
submit.onclick = writeGender;