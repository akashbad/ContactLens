//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers
//= require_self

$(function(){
  if($("#contact-grid")){
    var cards = new ContactLens.Views.Cards({
      collection: new ContactLens.Collections.Cards(),
      el: $("#contact-grid"),
      none: $("#none")
    });
    var controls = new ContactLens.Views.Controls({
      grid: cards,
      el: $("#selector-container")
    });    
  }
})