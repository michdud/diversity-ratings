const movies_db = firebase.database().ref('movies');

var firebaseRef = new Firebase(url);

    function writeRace() {
		var numRating = $(‘#race_rating’).val();

		movies_db.child('127380').set({race_rating: numRating});
		evt.preventDefault();
    }

    function writeGender() {
		var numRating = $(‘#gender_rating’).val();
	    	
		movies_db.child('127380').set({gender_rating: numRating});
		evt.preventDefault();
    }

var submit = document.getElementById('race_rating');
submit.onclick = writeRace;

submit = document.getElementById('gender_rating');
submit.onclick = writeGender;