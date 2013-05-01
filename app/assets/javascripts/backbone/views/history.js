$(function(){

  ContactLens.Views.GridHistoryItem = Backbone.View.extend({
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

  ContactLens.Views.HistoryItem = Backbone.View.extend({
    initialize: function(){
      this.$el.addClass("history-item");
    },

    render: function(){
      var template = _.template($("#history-item-template").html());
      this.$el.attr("id", this.model.get("id")).addClass("history-item " + this.model.get("type") + "-item").html(template(this.model.toJSON()));
    },

  });

  ContactLens.Views.History = Backbone.View.extend({
    initialize: function(options){
      this.collection.on("reset", this.render, this)
      this.collection.fetch();
    },

    render: function(){
      var $historyList = this.$el;
      _.each(this.collection.models, function(model){
        var item = new ContactLens.Views.HistoryItem({model: model});
        item.render();
        $historyList.append(item.el);
      });
    }

  });
})