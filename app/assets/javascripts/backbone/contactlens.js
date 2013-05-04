//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

window.ContactLens = window.ContactLens || {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {}
};

// Use mustache style templates.
// Now use {{ }} instead of <%= => for underscore templates
_.templateSettings = {
    //interpolate: /\{\{(.+?)\}\}/g
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

jQuery.fn.exists = function(){
  return this.length>0;
};

$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().replace(/\n/g,'<br/>'));
    return this;
};
