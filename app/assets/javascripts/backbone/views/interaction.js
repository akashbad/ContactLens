$(function(){
  
  ContactLens.Views.TwitterInteraction = Backbone.View.extend({
    initialize: function(options){
      this.template = _.template($(options.template).html());
      this.render();
      this.model.on("change", this.render, this);
    },

    events: {
      "keyup #twitter-input" : "setCharCount",
      "click #send-tweet" : "sendTweet",
      "click #send-retweet" : "retweet"
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()))
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
    },

    sendTweet: function(){
      var history = {"user_id": 3, "type": "twitter", "id":10, "icon":"twitter.png", "text": this.$el.find("#twitter-input").val()};
      this.render();
      this.trigger("sent", {item: history});
    },

    retweet: function(){
      var history = {"user_id": 3, "type": "twitter", "id":10, "icon":"twitter.png", "text": "RT:" + this.$el.find(".previous-tweet").text()};
      this.render();
      this.trigger("sent", {item: history});
    }
  })

  ContactLens.Views.Interactions = Backbone.View.extend({
    initialize: function(options){
      this.interactions = {};
      this.interactions.twitter = new ContactLens.Views.TwitterInteraction({
        model: options.twitter,
        template: $("#twitter-template"),
        el: $("#twitter")
      });
      this.interactions.twitter.on("sent", this.addHistory, this);
      this.history = options.history;
    },

    clearHistory: function(interaction){
      this.interactions[interaction].model.unset("interactionHistory");
    },

    setHistory: function(interaction, interactionHistory){interactionHistory
      this.interactions[interaction].model.set({"interactionHistory": interactionHistory.toJSON()});
    },

    addHistory: function(event){
      this.history.addHistory(event.item);
    }

  });



})