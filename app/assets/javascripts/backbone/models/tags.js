$(function(){

  ContactLens.Models.Tag = Backbone.Model.extend({

  });
  
  ContactLens.Collections.Tags = Backbone.Collection.extend({
    url: "/tags",
    model: ContactLens.Models.Tag
  })
})