$(function(){
  
  ContactLens.Views.TwitterInteraction = Backbone.View.extend({
    initialize: function(options){
      this.template = _.template($(options.template).html());
      this.oauthTemplate = _.template($(options.oauthTemplate).html());
      this.addTemplate = _.template($(options.addTemplate).html());
      this.render();
      this.model.on("change", this.render, this);
    },

    events: {
      "keyup #twitter-input" : "setCharCount",
      "click #send-tweet" : "sendTweet",
      "click #send-retweet" : "retweet",
      "keyup #add-twitter" : "addTwitterCheckEnter",
      "click #add-twitter-button": "addTwitterInfo"
    },

    render: function(){
      if(!this.model.get("oauth")){
        this.$el.html(this.oauthTemplate(this.model.toJSON()))
      }
      else if(!this.model.get("user_connected")){
        this.$el.html(this.addTemplate(this.model.toJSON()))
      }
      else{
        this.$el.html(this.template(this.model.toJSON()))
        this.setCharCount();   
      }     
    },

    setCharCount: function(){
      if ($("#twitter-input").exists()) {
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
    },

    sendTweet: function(){
      var content = this.$el.find("#twitter-input").val();
      this.tweet(false, content);
    },

    retweet: function(){
      this.tweet(true, "");
    },

    addTwitterCheckEnter: function(e){
      var key = e.keycode || e.which;
      if (key == 13){
        this.addTwitterInfo();
      }
    },

    addTwitterInfo: function(){
      var that = this;
      var handle = this.$el.find("#add-twitter").val();
      $.ajax({
        type: "post",
        url: window.location.pathname + "/update_twitter_handle",
        data: {"handle" : handle},
        dataType: "json",
        success: function(data){
          that.model.set(data);
          that.trigger("added", {item: data});
          $('#alert-message').text("Twitter handle added");
          $("#alert-container").show();
          setTimeout(function(){
            $('#alert-container').hide(400);
          }, 3000);
        },
        error: function(data){
          console.log(data);
          console.log("idiot");
        }
      });
    },

    tweet: function(retweet, content){
      var id = this.model.has("interactionHistory") ? this.model.get("interactionHistory").id : 0;
      that = this;
      $.ajax({
        type: "post",
        url: window.location.pathname + "/tweet",
        data: {"retweet" : retweet, "content": content, "item_id": id},
        success: function(data){
          that.trigger("sent", {item: data})
          $('#alert-message').text("Tweet Posted!");
          $("#alert-container").show();
          setTimeout(function(){
            $('#alert-container').hide(400);
          }, 3000);
        },
        error: function(data){
          console.log("dumb");
        }
      })
    }
  });

  ContactLens.Views.GmailInteraction = Backbone.View.extend({
    initialize: function(options){
      this.template = _.template($(options.template).html());
      this.render();
      this.model.on("change", this.render, this);
    },

    events: {
      "click #start-email-reply": "startEmailReply",
      "click #back-email": "backEmail",
      "click #send-email": "sendEmail"
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()))
      this.$el.find("#gmail-input").val("\n\n -Sent from ContactLens");
      if(this.model.has("interactionHistory")){
        this.$el.find("#gmail-reply-box").hide();
        this.$el.find(".previous-email").multiline(this.model.get("interactionHistory").deep_text)
        var subject = this.model.get("interactionHistory").text.replace(/([\[\(] *)?(RE|FWD?) *([-:;)\]][ :;\])-]*|$)|\]+ *$/ig, "");
        subject = "RE: "+ subject;
        this.$el.find("#gmail-subject").val(subject);
      }
    },

    startEmailReply: function(){
      this.$el.find("#gmail-email-box").slideUp();
      this.$el.find("#gmail-reply-box").slideDown();
    },

    backEmail: function(){
      this.$el.find("#gmail-reply-box").slideUp();
      this.$el.find("#gmail-email-box").slideDown();
    },

    sendEmail: function(){
      var history = {"contact_id":3, "outgoing": true, "type": "gmail", "id": 11, "icon": "gmail.png", "text": this.$el.find("#gmail-subject").val(), "deep_text": this.$el.find("#gmail-input").val()}
      this.trigger("sent", {item: history})
    }
  });

  ContactLens.Views.Interactions = Backbone.View.extend({
    initialize: function(options){
      this.interactions = {};

      this.interactions.twitter = new ContactLens.Views.TwitterInteraction({
        model: options.twitter,
        template: $("#twitter-template"),
        oauthTemplate: $("#twitter-oauth-template"),
        addTemplate: $("#twitter-add-template"),
        el: $("#twitter")
      });
      this.interactions.twitter.on("sent", this.addHistory, this);
      this.interactions.twitter.on("added", this.refreshHistory, this);

      this.interactions.gmail = new ContactLens.Views.GmailInteraction({
        model: options.gmail,
        template: $("#gmail-template"),
        el: $("#gmail")
      });
      this.interactions.gmail.on("sent", this.addHistory, this);

      this.history = options.history;
    },

    clearHistory: function(interaction){
      if(this.interactions.hasOwnProperty(interaction)){
        this.interactions[interaction].model.unset("interactionHistory");         
      }
    },

    setHistory: function(interaction, interactionHistory){interactionHistory
      if(this.interactions.hasOwnProperty(interaction)){
        this.interactions[interaction].model.set({"interactionHistory": interactionHistory.toJSON()});
      }
    },

    addHistory: function(event){
      this.history.addHistory(event.item);
    },

    refreshHistory: function(event){
      this.history.refresh();
    }

  });



})