const movies_db = firebase.database().ref('movies');

    function writeRace() {
		var numRating = $('#race_options :selected').text();

		const reference = movies_db.child('127380');
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
	    
	   	const reference = movies_db.child('127380');
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