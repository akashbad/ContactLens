$(function(){
  ContactLens.Routers.Engage = Backbone.Router.extend({
    initialize: function(){
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
          $(".history-item").removeClass("selected-history-item");
          if(id.length>0){
            $("#"+id).addClass("selected-history-item")
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