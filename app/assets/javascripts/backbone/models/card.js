$(function(){

  ContactLens.Models.Card = Backbone.Model.extend({
  });

  ContactLens.Collections.Cards = Backbone.Collection.extend({
    model: ContactLens.Models.Card,
    url: "/contact"
  });

}) 