$(function(){

  ContactLens.Models.HistoryItem = Backbone.Model.extend({
  });

  ContactLens.Collections.History = Backbone.Collection.extend({
    model: ContactLens.Models.HistoryItem,
    url: function(){
      return window.location.pathname + "/history";
    }
  });

});