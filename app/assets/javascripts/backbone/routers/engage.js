$(function(){
  ContactLens.Routers.Engage = Backbone.Router.extend({
    initialize: function(options){
      this.history = options.history;
      this.interactions = options.interactions;
    },

    routes: {
      ":tab" : "tabRouter",
      ":tab/history:id": "tabRouter",
      "*path" : "defaultRoute"
    },

    tabRouter: function(tab, id){
      var $tab = $('a[href="#' + tab + '"]');
      if ($tab.exists()) {
          $tab.tab("show");
          $(".history-item").removeClass("history-item-selected");
          if(id != undefined){
            var historyModel = this.history.select(id);
            if(historyModel != undefined)
            {
              this.interactions.setHistory(tab, historyModel); 
            }
          }
          else{
            this.interactions.clearHistory(tab)
          }
      }
      else {
          $('a[href="#twitter"]').tab("show");
      }
    },

    defaultRoute: function(){
      this.tabRouter("twitter");
    }
  });
})