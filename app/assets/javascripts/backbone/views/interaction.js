$(function(){
  
  ContactLens.Views.TwitterInteraction = Backbone.View.extend({
    initialize: function(options){
      this.blankTemplate = _.template($(options.blankTemplate).html());
      this.historyTemplate = _.template($(options.historyTemplate).html());
      this.render();
      this.model.on("change", this.render, this);
    },

    events: {
      "keyup #twitter-input" : "setCharCount"
    },

    render: function(){
      if(this.model.has("history")){
        this.$el.html(this.historyTemplate(this.model.toJSON()))
      }
      else{
        this.$el.html(this.blankTemplate(this.model.toJSON()))
      }
      this.setCharCount();
    },

    setCharCount: function(){
      var charCount = 140-$("#twitter-input").val().length;
      this.$el.find("#char-remain").text(charCount);
      if(charCount <= 0) {
        this.$el.find("#char-remain").css("color", "red");
        this.$el.find("#send-tweet").attr("disabled", "disabled");
      }
      else {
        this.$el.find("#char-remain").css("color", "black");
        this.$el.find("#send-tweet").removeAttr("disabled");
      }
    }
  })

  ContactLens.Views.Interactions = Backbone.View.extend({
    initialize: function(options){
      this.interactions = {}
      this.interactions.twitter = new ContactLens.Views.TwitterInteraction({
        model: options.twitter,
        blankTemplate: $("#twitter-blank-template"),
        historyTemplate: $("#twitter-history-template"),
        el: $("#twitter")
      })
    },

    clearHistory: function(interaction){
      this.interactions[interaction].model.unset("history");
    },

    setHistory: function(interaction, history){
      this.interactions[interaction].model.set({"history": history.toJSON()});
    }


  });



})