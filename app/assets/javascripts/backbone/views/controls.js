$(function(){
  ContactLens.Views.Controls = Backbone.View.extend({
    initialize: function(options){
      this.tags = new ContactLens.Models.Tags();
      this.tags.on("change", this.assignAutocomplete, this);
      this.tags.fetch();
      this.grid = options.grid;
      this.$el.find(".selectpicker").selectpicker();
    },

    events: {
      "keyup #search-bar": "searchBarKey",
      "click #search-button": "searchButtonClick",
      "click #search-tags li a": "tagClick",
      "change .selectpicker": "sort"
    },

    assignAutocomplete: function(){
      this.$el.find("#search-bar").typeahead({
        source: this.tags.get("tags")
      });
    },

    getFilters: function(){
      var isoFilters = [];
      this.$el.find("#search-tags li.active:visible").each(function(index, elem){
        isoFilters.push($(elem).attr('data-filter'));
      });
      return isoFilters;
    },

    searchBarKey: function(event){
      if(event.keyCode == 13){
        this.searchButtonClick();
      }
    },

    searchButtonClick: function(event){
      var tag = this.$el.find("#search-bar").first().val();
      if(tag != ""){
        this.appendFilter(tag)
        this.$el.find("#search-bar").val('');
        this.grid.filter(this.getFilters())
      }
    },

    appendFilter: function(tag){
      this.$el.find("#search-tags li.active:visible").each(function(index, element){
        $(this).toggleClass("active");
      });
      this.$el.find('#search-tags').append(
        "<li class='active' data-filter='."+tag.toLowerCase()+"'><a>" + tag + "<button type='button' class='close' data-dismiss='alert'><i class='icon-remove icon-white'></i></button></a></li>")
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

    }
  })
})