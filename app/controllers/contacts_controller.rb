require 'httparty'
require 'linkedin'
class ContactsController < ApplicationController
  before_filter :authenticate_user!
  include HTTParty
  
  $b = 0

  def index
    history1 = {contact_id: 3, type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32k"}
    history2 = {contact_id: 3, type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {contact_id: 3, type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history_1 = [history1, history2, history3]

    cards = []
    current_user.contacts.all.each do |contact|
      person = JSON.parse(contact.person)
      history = get_history(contact, 3)
      tags = ""
      contact.tags.each do |tag|
        tags = tags + " " + tag.text.downcase
      end
      card = {contact_id: contact.id, name: contact.first_name + " " + contact.last_name, picture: contact.picture, type: "large-card", tag: tags, history: history, timestamp: history.any? ? history[0][:timestamp].to_i : "0"}
      cards.push(card)
    end
    gon.cards = cards
    tags = []
    current_user.tags.each do |tag|
      tags.push(tag.text)
    end
    gon.tags = {tags: tags}
    respond_to do |format|
      format.html { render } # index.html.haml
    end
  end

  def all 
    @contacts = Contact.all
    respond_to do |format|
      format.html { render } # all.html.erb
    end
  end

  def generate_history
    contact = Contact.find(params[:id])
    contact.update_history(current_user, 50)
    render text: "Success"
  end

  def new 
    @contact = Contact.new
    render partial: 'form'
  end

  def tweet
    contact = Contact.find(params[:id])
    auth = current_user.authentications.where(provider: "twitter").first
    twitter = Twitter::Client.new(
      :oauth_token => auth.oauth_token,
      :oauth_token_secret => auth.oauth_token_secret
    )
    content = params[:content]
    retweet = params[:retweet]
    id = params[:item_id]
    # If id is 0, then it is a new tweet
    if id == "0"
      tweet = twitter.update(content)
      tweet_item = TwitterHistoryItem.find_or_create_by_json(contact_id: contact.id, timestamp: tweet.attrs[:created_at], json: tweet.to_json)
      tweet = JSON.parse(tweet_item.json)
      response = {contact_id: contact.id, outgoing: true, type: "twitter", id: tweet_item.id, icon: "twitter.png", text: tweet["text"]}
    else
      # Otherwise it is a reply or retweet
      if retweet == "true"
        tweet_item = TwitterHistoryItem.find(id)
        tweet = JSON.parse(tweet_item.json)
        new_tweet = twitter.retweet(tweet["id"]).first
        new_tweet_item = TwitterHistoryItem.find_or_create_by_json(contact_id: contact.id, timestamp: new_tweet.attrs[:created_at], json: new_tweet.to_json)
        new_tweet = JSON.parse(new_tweet_item.json)
        response = {contact_id: contact.id, outgoing: true, type: "twitter", id: new_tweet_item.id, icon: "twitter.png", text: new_tweet["text"]}
      else
        # Looks like it's a reply
        tweet_item = TwitterHistoryItem.find(id)
        tweet = JSON.parse(tweet_item.json)
        new_tweet = twitter.update(content, {in_reply_to_status_id: tweet["id"]})
        new_tweet_item = TwitterHistoryItem.find_or_create_by_json(contact_id: contact.id, timestamp: new_tweet.attrs[:created_at], json: new_tweet.to_json)
        new_tweet = JSON.parse(new_tweet_item.json)
        response = {contact_id: contact.id, outgoing: true, type: "twitter", id: new_tweet_item.id, icon: "twitter.png", text: new_tweet["text"]}
      end
    end
    render json: response
  end

  def email
    render json: {contact_id:3, outgoing: true, type: "gmail", id: 11, icon: "gmail.png", text: params[:subject], deep_text: params[:content]}
  end

  def update_twitter_handle
    contact = Contact.find(params[:id])
    handle = params[:handle]
    handle = handle.gsub("@", "")
    contact.picture = "https://api.twitter.com/1/users/profile_image?screen_name="+handle+"&size=reasonably_small"
    person = JSON.parse(contact.person)

    auth = current_user.authentications.where(provider: "twitter").first
    twitter = Twitter::Client.new(
      :oauth_token => auth.oauth_token,
      :oauth_token_secret => auth.oauth_token_secret
    )
    if !current_user.twitter_handle || !current_user.full_name
      user = twitter.user
      current_user.twitter_handle = user["username"]
      current_user.full_name = user["name"]
      current_user.save
    end

    twitter.user(handle)
    contact.twitter_handle = handle

    contact.update_history(current_user, 50)
    twitter = {oauth: (current_user.authentications.where(provider: "twitter").length > 0), 
                   user_connected: !contact.twitter_handle.nil?, contact_handle: contact.twitter_handle.to_s, 
                   contact_name: contact.full_name, user_handle: current_user.twitter_handle, user_name: current_user.full_name}
    if contact.save
      render json: twitter, status: 200
    else
      render json: {message: "Failed to save handle"}, status: 422
    end
  end

  def update_tag
    render json: {message: "Success"}, status:200
  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.user_id = current_user.id
    api_key = "62f8b707449cd237"

    person = HTTParty.get('https://api.fullcontact.com/v2/person.json?email=' + @contact.email + '&apiKey=' + api_key).body
    puts "RESPONSE: " + person.to_s
    @contact.person = person
    if person["photos"]
      @contact.picture = JSON.parse(person)["photos"].first["url"]
    end

    @person = JSON.parse(person)
    if @person["socialProfiles"] 
      @person["socialProfiles"].each do |profile|
        if profile["type"] == "twitter"
          @contact.twitter_handle = profile["username"]
          @contact.picture = "https://api.twitter.com/1/users/profile_image?screen_name="+@contact.twitter_handle+"&size=reasonably_small"
        end
      end
    end


    respond_to do |format|
      if @contact.save
        @contact.update_history(current_user, 50)
        format.html { redirect_to @contact, notice: 'Product was successfully created.' }
        format.json { render json: @contact, status: :created, location: @contact }
      else
        format.html { render action: "new" }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def approve
    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end

  def edit
    @contact = Contact.find(params[:id])
  end

  def update
    @contact = Contact.find(params[:id])

    respond_to do |format|
      if @contact.update_attributes(params[:contact])
        format.html { redirect_to @contact, notice: 'Product was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def update_contact
    @contact = Contact.find(params[:id])

    @contact.twitter_handle = params[:twitter_handle].gsub("@", "")
    @contact.email = params[:email]
    @contact.note = params[:notes]
    tags = []
    if params[:tags]
      params[:tags].each do |text|
        tag = Tag.find_or_create_by_text_and_user_id(text: text, user_id: current_user.id)
        tags.push(tag)
      end
    end
    @contact.tags = tags
    if @contact.save
      params[:handle] = params[:twitter_handle]
      update_twitter_handle
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy

    respond_to do |format|
      format.html { redirect_to contacts_url }
      format.json { head :no_content }
    end
  end

  def show
    @contact = Contact.find(params[:id])
    if @contact.user_id != current_user.id
      redirect_to "/contacts" 
      return
    end 
    @person = JSON.parse(@contact.person)
    
    # client = LinkedIn::Client.new
    # client.authorize_from_access("f97f44be-da36-4997-a5cb-682be5ae8b36", "34de2e0d-938d-4f31-881e-c9300eb8aa18")
    # client.profile
    user_name = ""
    user_handle = ""
    if current_user.authentications.where(provider: "twitter").length >0
      auth = current_user.authentications.where(provider: "twitter").first
      twitter = Twitter::Client.new(
        :oauth_token => auth.oauth_token,
        :oauth_token_secret => auth.oauth_token_secret
      )
      if !current_user.twitter_handle || !current_user.full_name
        user = twitter.user
        current_user.twitter_handle = user["username"]
        current_user.full_name = user["name"]
        current_user.save
      end
    end

    gen_history()
    gon.gmail = {oauth: true, contact_email: @contact.email, contact_name: @contact.full_name, user_email: current_user.email, user_name: user_name}
    gon.twitter = {oauth: (current_user.authentications.where(provider: "twitter").length > 0), 
                   user_connected: !@contact.twitter_handle.nil?, contact_handle: @contact.twitter_handle.to_s, 
                   contact_name: @contact.full_name, user_handle: current_user.twitter_handle, user_name: current_user.full_name}
    tags = []
    current_user.tags.each do |tag|
      tags.push(tag.text)
    end
    gon.tags = {tags: tags}

    tags = []
    @contact.tags.each do |tag|
      tags.push(tag.text)
    end
    gon.contact_tags = tags
    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end

  def contact
    @cards = []
    current_user.contacts.all.each do |contact|
      person = JSON.parse(contact.person)
      history = get_history(contact, 3)
      tags = ""
      contact.tags.each do |tag|
        tags = tags + " " + tag.text.downcase
      end
      card = {contact_id: contact.id, name: contact.first_name + " " + contact.last_name, picture: contact.picture, type: "large-card", tag: tags, history: history, timestamp: history[0][:timestamp].to_i}
      cards.push(card)
    end
    render json: @cards
  end

  def tags
    @tags = {tags: ['Investor', 'Beta', 'Advisor',  'Reporter']}
    render json: @tags
  end

  def gen_history
    contact = Contact.find(params[:id])
    @history = get_history(contact, 50)
    gon.history = @history
    @history
  end

  def history
    render json: gen_history()
  end

  def twitter
    render json: {oauth: true, user_connected: true, user_handle: "@ryanmlau", my_handle: "@akashbad"}
  end

  def get_history(contact, num)
    if contact.history_items.length > 0
      @history = []
      contact.history_items.order("timestamp DESC").first(num).each do |item|
        tweet = JSON.parse(item.json)
        @history.push({contact_id: contact.id, outgoing: false, type: "twitter", id: item.id, icon: "twitter.png", text: tweet["text"], timestamp: item.timestamp})
      end
    else
      if contact.update_history(current_user, num) != false && num > 1
        num -= 1
        get_history(contact,num)
      else
        @history = []
      end
    end
    @history
  end
end