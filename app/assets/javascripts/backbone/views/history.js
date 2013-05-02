$(function(){

  ContactLens.Views.GridHistoryItem = Backbone.View.extend({
    initialize: function(){
    },

    attributes: function(){
      return {
        class: "history-item history-item-grid"
      };
    },

    render: function(){
      var template = _.template($("#history-item-template").html());
      this.$el.html(template(this.model.toJSON()));
    },

  });

  ContactLens.Views.HistoryItem = Backbone.View.extend({
    initialize: function(){
      this.$el.addClass("history-item");
    },

    attributes: function(){
      return{
        class: "history-item"
      }
    },

    render: function(){
      var template = _.template($("#history-item-template").html());
      this.$el.attr("id", "history" + this.model.get("id")).html(template(this.model.toJSON()));
    }
  });

  ContactLens.Views.History = Backbone.View.extend({
    initialize: function(options){
      this.collection.on("reset", this.render, this)
    },

    render: function(){
      this.$el.empty();
      var $historyList = this.$el;
      _.each(this.collection.models, function(model){
        var item = new ContactLens.Views.HistoryItem({model: model});
        item.render();
        $historyList.append(item.el);
      });
      Backbone.history.loadUrl(Backbone.history.fragment)
    },

    select: function(id){
      this.$el.find("#history"+id).addClass("history-item-selected");
      return this.collection.where({id: parseInt(id)})[0];
    },

    addHistory: function(item){
      var historyItem = new ContactLens.Models.HistoryItem(item);
      this.collection.add(historyItem, {at: 0});
      this.render();
    }

  });
})