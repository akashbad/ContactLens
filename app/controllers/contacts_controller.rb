require 'httparty'
class ContactsController < ApplicationController
  before_filter :authenticate_user!
  include HTTParty
  
  def index
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

  def new 
    @contact = Contact.new
    respond_to do |format|
      format.html { render } # all.html.erb
    end
  end

  def create
    @contact = Contact.new(params[:contact])
    api_key = "62f8b707449cd237"

    person = HTTParty.get('https://api.fullcontact.com/v2/person.json?email=' + @contact.email + '&apiKey=' + api_key).body
    puts "RESPONSE: " + person.to_s
    @contact.person = person

    respond_to do |format|
      if @contact.save
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
    @person = JSON.parse(@contact.person)

    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end

  def contact
    history1 = {type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32k"}
    history2 = {type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history_1 = [history1, history2, history3]

    history4 = {type: "phone", id: 3, icon: "phone.png", text: "Call on 04/10/13: 47 minutes"}
    history5 = {type: "calendar", id: 3, icon: "calendar.png", text: "Interview on 04/03/13"}
    history6 = {type: "gmail", id: 3, icon: "gmail.png", text: "RE: Request for an interview with the founder of Threadstop"}
    history_2 = [history4, history5, history6]

    history7 = {type: "calendar", id: 3, icon: "calendar.png", text: "Meeting on 02/17/13: Go over terms"}
    history8 = {type: "gmail", id: 3, icon: "gmail.png", text: "RE: Interested in investing in a fast paced startup?"}
    history9 = {type: "phone", id: 3, icon: "phone.png", text: "Call on 03/20/13: 20 minutes"}
    history_3 = [history7, history8, history9]

    ryan = {name: "Ryan Lau", picture: "https://api.twitter.com/1/users/profile_image?screen_name=ryanmlau&size=reasonably_small", type: "small-card", tag: "beta", history: history_1}
    heinz = {name: "Matt Heinz", picture: "https://api.twitter.com/1/users/profile_image?screen_name=heinzmarketing&size=reasonably_small", type: "small-card", tag: "advisor", history: history_1}
    dharmesh = {name: "Dharmesh Shah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=dharmesh&size=reasonably_small", type: "small-card", tag: "investor", history: history_1}
    dyor = {name: "Matt Dyor", picture: "https://api.twitter.com/1/users/profile_image?screen_name=mattdyor&size=reasonably_small", type: "small-card", tag: "advisor", history: history_1}
    tim = {name: "Tim Moody", picture: "https://api.twitter.com/1/users/profile_image?screen_name=timlmoody&size=reasonably_small", type: "small-card", tag: "reporter", history: history_1}
    delian = {name: "Delian Asparouhov", picture: "https://api.twitter.com/1/users/profile_image?screen_name=mitdelian&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    aziz = {name: "Aziz Ansari", picture: "https://api.twitter.com/1/users/profile_image?screen_name=azizansari&size=reasonably_small", type: "medium-card", tag: "beta", history: history_2}
    paul = {name: "Paul Graham", picture: "https://api.twitter.com/1/users/profile_image?screen_name=paulg&size=reasonably_small", type: "medium-card", tag: "investor", history: history_2}
    jon = {name: "Jon Froehlich", picture: "https://api.twitter.com/1/users/profile_image?screen_name=jonfroehlich&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    nate = {name: "Nate Silver", picture: "https://api.twitter.com/1/users/profile_image?screen_name=fivethirtyeight&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    buzz = {name: "Buzz Aldrin", picture: "https://api.twitter.com/1/users/profile_image?screen_name=therealbuzz&size=reasonably_small", type: "medium-card", tag: "beta", history: history_2}
    bill = {name: "Bill Nye", picture: "https://api.twitter.com/1/users/profile_image?screen_name=thescienceguy&size=reasonably_small", type: "medium-card", tag: "advisor", history: history_2}
    akash = {name: "Akash Badshah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=akashbad&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    john = {name: "John Resig", picture: "https://api.twitter.com/1/users/profile_image?screen_name=jeresig&size=reasonably_small", type: "large-card", tag: "beta", history: history_3}
    brad = {name: "Brad Feld", picture: "https://api.twitter.com/1/users/profile_image?screen_name=bfeld&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    barack = {name: "Barack Obama", picture: "https://api.twitter.com/1/users/profile_image?screen_name=barackobama&size=reasonably_small", type: "large-card", tag: "advisor", history: history_3}
    peter = {name: "Peter Thiel", picture: "https://api.twitter.com/1/users/profile_image?screen_name=peterthiel&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    nilay = {name: "Nilay Patel", picture: "https://api.twitter.com/1/users/profile_image?screen_name=reckless&size=reasonably_small", type: "large-card", tag: "reporter", history: history_3}
    victor = {name: "Victor Pontis", picture: "https://api.twitter.com/1/users/profile_image?screen_name=viccypont&size=reasonably_small", type: "large-card", tag: "advisor", history: history_3}

    people = [ryan, heinz, dharmesh, dyor, tim, delian, aziz, paul, jon, nate, buzz, bill, akash, john, brad, barack, peter, nilay, victor]
    render json: people
  end

  def tags
    @tags = {tags: ['Investor', 'Beta', 'Advisor', 'Reporter'] }
    render json: @tags
  end
end