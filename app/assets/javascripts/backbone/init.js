//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers
//= require_self

$(function(){
  if($("#contact-grid").exists()){
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
  if($("#engage").exists()){
    var router = new ContactLens.Routers.Engage({});
    var history = new ContactLens.Views.History({
      collection: new ContactLens.Collections.History(),
      el: $("#history-list")
    });
    Backbone.history.start();
  }
})