function ajaxCall() {
  $('iframe').attr('src','');
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+ $('#search').val(),
    dataType: 'jsonp',
    type: 'GET',
    success: function(data) {
      $('#update').empty();
      let results = JSON.stringify(data);
      results = JSON.parse(results);
      let output = '';
      results.query.search.forEach(function(data) {
        let title = `<h2><a href="https://en.wikipedia.org/wiki/${data.title}" target=_blank>${data.title}</a></h2><br>`;
        let snippet = "<p>" + data.snippet + "</p>";
        output += title + snippet + '<hr>';
      });
      $('#update').append(output);
    }
  });
}

function randomArticle() {
  $(this).text('Show another article');
  $('#update').empty();
  $('#search').empty();
  $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function() {
  $('#search').focus().off('keyup').on('keyup', ajaxCall);
  $('.random').on('click', randomArticle);
});
