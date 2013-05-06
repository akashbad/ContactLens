//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers
//= require_self

$(function(){
  if($("#contact-grid").exists()){
    var cardCollection = new ContactLens.Collections.Cards();
    var cards = new ContactLens.Views.Cards({
      collection: cardCollection,
      el: $("#contact-grid"),
      none: $("#none")
    });
    cardCollection.reset(gon.cards)

    var tags = new ContactLens.Models.Tags();
    var controls = new ContactLens.Views.GridControls({
      grid: cards,
      el: $("#selector-container"),
      tags: tags
    });    
    tags.set(gon.tags);
  }

  if($("#engage").exists()){
    var historyCollection = new ContactLens.Collections.History();
    var history = new ContactLens.Views.History({
      collection: historyCollection,
      el: $("#history-list")
    });

    var twitterModel = new ContactLens.Models.TwitterInteraction(gon.twitter);
    var gmailModel = new ContactLens.Models.GmailInteraction(gon.gmail);
    
    var interactions = new ContactLens.Views.Interactions({
      twitter: twitterModel,
      gmail: gmailModel,
      history: history
    });
    
    var tags = new ContactLens.Models.Tags();
    var controls = new ContactLens.Views.EngageControls({
      el: $(".tags-row"),
      tags: tags
    });
    tags.set(gon.tags);

    var router = new ContactLens.Routers.Engage({
      history: history,
      interactions: interactions
    });
    Backbone.history.start();

    historyCollection.reset(gon.history);
  }
})