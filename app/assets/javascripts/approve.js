$(document).ready(function(){
  var tags = ['Investor', 'Beta', 'Advisor', 'Reporter']
  $('#tags-input').typeahead({
      source: tags
    });
  $('#tags-input').keyup(function(event)  {
    if(event.keyCode == 13){
      var tag = $('#tags-input').val();
      appendTag(tag);
      $('#tags-input').val('');
    }
  });
  function appendTag(tag){
    $('#tags').append("<li class='active' data-filter='."+tag.toLowerCase()+"'><a>" + tag + "</a></li>")
  };
})