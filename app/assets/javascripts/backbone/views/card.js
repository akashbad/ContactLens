$(function(){

  ContactLens.Views.Card = Backbone.View.extend({
    initialize: function(){
      this.model.on("change", this.render, this);
    },

    render: function(){
      var template = _.template($("#card-template").html());
      this.$el.attr("data-name", this.model.get("name")).addClass(this.model.get("type") + " contact-card " + this.model.get("tag")).html(template(this.model.toJSON()));
      var $historyBox = this.$el.find(".large-detail").first();
      _.each(this.model.get("history"),function(historyItem){
        var item = new ContactLens.Views.GridHistoryItem({model: new ContactLens.Models.HistoryItem(historyItem)});
        item.render()
        $historyBox.append(item.el)
      });
    }, 

    events: {
      "click .card-name": "show",
      "click .card-pic": "resize",
    },

    show: function(event){
      event.stopPropagation();
      window.location = window.location.href + "contacts/" + this.model.get("user_id");
    },

    resize: function(event){
      var $card = this.$el;
      if($card.hasClass('small-card')){
        $card.removeClass('small-card');
        $card.addClass('medium-card');
        $card.find('.medium-detail').css("display", "inline-block");
      }
      else if($card.hasClass('medium-card')){
        $card.removeClass('medium-card');
        $card.addClass('large-card');
        $card.find('.large-detail').show();
      }
      else if($card.hasClass('large-card')){
        $card.find('.large-detail').hide();
        $card.find('.medium-detail').hide();
        $card.removeClass('large-card');
        $card.addClass('small-card');
      }
      $('#contact-grid').isotope('reLayout');
    }
  });

  ContactLens.Views.Cards = Backbone.View.extend({
    initialize: function(options){
      this.$el.isotope({
        itemSelector: '.contact-card',
        layoutMode: 'perfectMasonry',
        perfectMasonry: {
          columnWidth: 148,
          rowHeight: 148
        },
        animationEngine: "best-available",
        getSortData : {
          name: function($elem) {
            return $elem.attr('data-name');
          }
        }
      });
      this.$none = $(options.none);
      this.collection.on("reset", this.render, this);
    },

    render: function(){
      var $newCards = $(_.map(this.collection.models, function(model){
        var card = new ContactLens.Views.Card({model: model});
        card.render();
        return card.el;
      }));
      this.$el.isotope("insert", $newCards);
    },

    filter: function(filters){
      var that = this
      that.$none.fadeOut();
      that.$el.isotope({
        filter: filters.join(', ')
      }, function( $items ) {
        len = $items.length;
        if(len == 0){
          that.$none.fadeIn();
        }
      });
    },

    sort: function(param){
      this.$el.isotope({sortBy: param});
    }
  }); 
})


