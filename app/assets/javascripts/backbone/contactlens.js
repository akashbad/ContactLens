//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers

window.ContactLens = window.ContactLens || {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},
  Utils: {}
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

ContactLens.Utils.linkifyTweets = function (tweet) {
    // process links and reply
    tweet = tweet.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@@#\/%?=~_|!:,.;]*[-A-Z0-9+&@@#\/%=~_|])/ig, function (url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    }).replace(/#([_a-z0-9]+)/ig, function (reply) {
        return reply.charAt(0) + '<a href="https://twitter.com/search/%23' + reply.substring(1) + '" target="_blank">' + reply.substring(1) + '</a>';
    }).replace(/@([_a-z0-9]+)/ig, function (reply) {
        return reply.charAt(0) + '<a href="https://twitter.com/' + reply.substring(1) + '" target="_blank">' + reply.substring(1) + '</a>';
    });
    return tweet;
};

