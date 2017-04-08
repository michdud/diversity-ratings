$("#race_rating").click(function () {
  var reviewText = $('#race_explanation').val();
  $("#container").append('<div class="row">'+ reviewText +'</div>');
  clearContents('race_explanation');
  console.log(hi);
});
