$(function(){

  ContactLens.Views.HistoryItem = Backbone.View.extend({
    initialize: function(){
    },

    attributes: function(){
      return {
        class: "history-item history-item-grid"
      };
    },

    events: {
      "click" : "contact"
    },

    render: function(){
      var template = _.template($("#history-item-template").html());
      this.$el.html(template(this.model.toJSON()));
    },

    contact: function(){
      window.location = window.location.href + "show";
    }
  });
})