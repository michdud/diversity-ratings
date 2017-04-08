$("#race_rating").click(function () {
  var reviewText = $('#race_explanation').val();
  var domElement = $('<div class="row">'+ reviewText +'</div>');
  $(this).after(domElement);
  //$("#container").append('<div class="row">'+ reviewText +'</div>');
});
