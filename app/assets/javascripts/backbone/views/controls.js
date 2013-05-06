$(function(){

  ContactLens.Views.GridControls = Backbone.View.extend({
    initialize: function(options){
      this.tags = options.tags
      this.tags.on("change", this.assignAutocomplete, this);
      this.grid = options.grid;
      this.$el.find("#search-bar").quicksearch("#contact-grid .contact-card", {
        'show': function() {
            $(this).addClass('quicksearch-match');
        },
        'hide': function() {
            $(this).removeClass('quicksearch-match');
        },
        'selector': ".name"
      });
    },

    events: {
      "keyup #filter-bar": "filterBarKey",
      "click #filter-button": "filterButtonClick",
      "click #filter-tags li a": "tagClick",
      "keyup #search-bar": "search"
    },

    assignAutocomplete: function(){
      this.$el.find("#filter-bar").typeahead({
        source: this.tags.get("tags")
      });
    },

    getFilters: function(){
      var isoFilters = [];
      this.$el.find("#filter-tags li.active:visible").each(function(index, elem){
        isoFilters.push($(elem).attr('data-filter'));
      });
      return isoFilters;
    },

    filterBarKey: function(event){
      if(event.keyCode == 13){
        this.filterButtonClick();
      }
    },

    filterButtonClick: function(event){
      var tag = this.$el.find("#filter-bar").val();
      if(tag != ""){
        this.appendFilter(tag)
        this.$el.find("#filter-bar").val('');
        this.grid.filter(this.getFilters())
      }
    },

    appendFilter: function(tag){
      this.$el.find("#filter-tags li.active:visible").each(function(index, element){
        $(this).toggleClass("active");
      });
      var filterTemplate = _.template($("#filter-template").html());
      this.$el.find('#filter-tags').append(filterTemplate({"tag": tag, "lowerTag": tag.toLowerCase()}));
    },

    tagClick: function(event){
      event.preventDefault();
      $(event.currentTarget).parent().toggleClass("active");
      if($(event.target).is("button")){
        $(event.currentTarget).parent().removeClass("active");
      }
      this.grid.filter(this.getFilters())
    },

    search: function(event){
      var grid = this.grid;
      setTimeout( function() {
          grid.filter([".quicksearch-match"]); 
      }, 100 );
    }
  });

  ContactLens.Views.EngageControls = Backbone.View.extend({
    initialize: function(options){
      this.tags = options.tags
      this.tags.on("change", this.assignAutocomplete, this);
      var that = this;
      _.each(options.contactTags, function(tag){
        that.appendTag(tag);
      })
      this.interactions = options.interactions;
      this.interactions.on("twitterAdded", this.setTwitter, this)
    },

    events: {
      "keyup .tags-input" : "tagEnter",
      "click #contact-save": "updateContact"
    },

    assignAutocomplete: function(){
      this.$el.find(".tags-input").typeahead({
        source: this.tags.get("tags")
      });
    },

    tagEnter: function(event){
      if(event.keyCode == 13){
        var tag = this.$el.find(".tags-input").val();
        if(tag != ""){
          this.appendTag(tag)
          this.$el.find(".tags-input").val('');          
        }
      }
    },

    appendTag: function(tag){
      var tagTemplate = _.template($("#tag-template").html());
      this.$el.find(".tags").append(tagTemplate({"tag": tag}));
    },

    updateContact: function(){
      var name = this.$el.find("#contact-name").val();
      var notes = this.$el.find("#notes").val();
      var tags = _.map(this.$el.find("#tag-box li.active"), function(elem){ return $(elem).attr("data-tag")})
      var email = this.$el.find("#contact-email").val();
      var twitterHandle = this.$el.find("#contact-twitter-handle").val();
      var that = this;
      $.ajax({
        type: "post",
        url: window.location.pathname + "/update_contact",
        data: {"name": name, "notes": notes, "tags": tags, "email": email, "twitter_handle": twitterHandle},
        success: function(data){
          console.log(data.message);
          that.interactions.addTwitter(data.handle);
          that.interactions.addEmail(data.email)
        },
        error: function(data){
          console.log("dumb");
        }  
      });    
    },

    setTwitter: function(event){
      this.$el.find("#contact-twitter-handle").val("@" + event.handle);
    }

  });
})