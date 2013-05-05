$(function(){

  ContactLens.Views.Tag = Backbone.View.extend({
    initialize: function(){
      this.model.on("change", this.render, this);
      this.template = _.template($("#tag-template").html());
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  ContactLens.Views.Controls = Backbone.View.extend({
    initialize: function(options){
      this.tags = new ContactLens.Collections.Tags();
      this.tags.on("reset", this.assignAutocomplete, this);
      this.tags.fetch();
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
      var tags = _.map(this.tags.models, function(model){
        return model.get("name");
      });
      this.$el.find("#filter-bar").typeahead({
        source: tags
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
      var tag = this.$el.find("#filter-bar").first().val();
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
      this.$el.find('#filter-tags').append("<li class='active' data-filter='."+tag.toLowerCase()+"'><a>" + tag + "<button type='button' class='close' data-dismiss='alert'><i class='icon-remove icon-white'></i></button></a></li>");
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
  })
})