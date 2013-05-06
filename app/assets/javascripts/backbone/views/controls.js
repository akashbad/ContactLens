$(function(){

  ContactLens.Views.GridControls = Backbone.View.extend({
    initialize: function(options){
      this.tags = options.tags
      this.tags.on("change", this.assignAutocomplete, this);
      this.grid = options.grid;
      this.$el.find(".selectpicker").selectpicker();
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
      "change .selectpicker": "sort",
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

    sort: function(event){
      var selected = this.$el.find(".selectpicker option:selected").val();
      if(selected == "No sort"){
        this.grid.sort("random");
      }
      if(selected == "Alphabetical"){
        this.grid.sort("name");
      }
      if(selected == "Recent Contact"){
        this.grid.sort("time");
      }
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
    },

    events: {
      "keyup .tags-input" : "tagCreate",
      "click .tags .close" : "tagDelete"
    },

    assignAutocomplete: function(){
      this.$el.find(".tags-input").typeahead({
        source: this.tags.get("tags")
      });
    },

    tagCreate: function(event){
      if(event.keyCode == 13){
        var tag = this.$el.find(".tags-input").val();
        if(tag != ""){
          var that = this
          $.ajax({
            type: "post",
            url: window.location.pathname + "/update_tag",
            data: {"tag": tag},
            dataType: "json",
            success: function(data){
              that.appendTag(tag);
            },
            error: function(data){
              console.log("fuck tags");
            }
          });
          this.$el.find(".tags-input").val('');          
        }
      }
    },

    appendTag: function(tag){
      var tagTemplate = _.template($("#tag-template").html());
      this.$el.find(".tags").append(tagTemplate({"tag": tag}));
      this.tags.fetch();        
    },

    tagDelete: function(event){
      var tag = $(event.currentTarget).attr("data-tag");
      var node = $(event.currentTarget).parent().parent();
      var that = this;
      $.ajax({
        type: "delete",
        url: window.location.pathname + "/update_tag",
        data: {"tag": tag},
        dataType: "json",
        success: function(data){
          that.removeTag(node);
        },
        error: function(data){
          console.log("fuck tags");
        }
      });
    },

    removeTag: function(node){
      $(node).remove();
      $(node).trigger('closed');
    }


  })
})