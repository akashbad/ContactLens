$(function(){
  
  ContactLens.Models.TwitterInteraction = Backbone.Model.extend({
    url: "/twitter",
    
    initialization: function(){
    }
  });

  ContactLens.Models.GmailInteraction = Backbone.Model.extend({
    url: "/gmail",

    initialization: function(){
    }
  });

})