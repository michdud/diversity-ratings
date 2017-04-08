
var page = 1;
var last_key;
const movies_db = firebase.database().ref('movies');

var make_movie_box = function make_movie_box(
    index, img_src,title,date,rat_overall, rat_race, rat_gender){
    rat_overall = "Overall Rating: " + rat_overall;
    rat_race = "Racial Diversity: " + rat_race;
    rat_gender = "Gender Diversity: " + rat_gender;
    $("#" + index).each(function(index,el){
	$(this).find("img").attr("src", img_src);
	$(this).find(".movie_title a").html(title);
	$(this).find(".release_date > p").html(date);
	$(this).find(".rating_overall > h4").html(rat_overall);
	$(this).find(".rating_race_diversity > p").html(rat_race);
	$(this).find(".rating_gender_representation > p").html(rat_gender);
    });
};

function parse_date(release_date) {

    var months = ["January", "February", "March", "April", "May", "June",        "July", "August", "September", "October", "November", "December"];
    var monthNum = parseInt(release_date.substring(5,7)) - 1;
    var day = parseInt(release_date.substring(8,10));
    var year = release_date.substring(0,4);
    return months[monthNum] + " " + day.toString() + ", " + year;
}

function setup_page(page, last_key){
    var index = 0;
    var limit = 6;
    var firstn_movies;
    if (page == 1){
	firstn_movies = movies_db.orderByKey().limitToFirst(limit);
    } else {
	firstn_movies = ref.orderByKey().startAt(last_Key).limitToFirst(limit);
    }

    firstn_movies.once('value', function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
	    var img_src = childSnapshot.val().poster_path;
	    img_src = "https://image.tmdb.org/t/p/w1280" + img_src;
	    var title = childSnapshot.val().original_title;
	    var release_date = childSnapshot.val().release_date;
	    release_date = parse_date(release_date);
	    var rat_overall = "100%";//childSnapshot.val().
	    var rat_race = "100%";//childSnapshot.val().
	    var rat_gender = "100%";//childSnapshot.val().;
	    make_movie_box(index,img_src,title,release_date,rat_overall,rat_race,rat_gender);
	    //last_Key = snapshot.key();
	    index++;
	    console.log(index);
	});
    });
};

setup_page(1,null);
