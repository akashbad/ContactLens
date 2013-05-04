require 'httparty'
class ContactsController < ApplicationController
  before_filter :authenticate_user!
  include HTTParty
  
  $b = 0

  def index
    history1 = {user_id: 3, type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32k"}
    history2 = {user_id: 3, type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {user_id: 3, type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history_1 = [history1, history2, history3]

    cards = []
    Contact.all.each do |contact|
      person = JSON.parse(contact.person)
      card = {user_id: contact.id, name: contact.first_name + " " + contact.last_name, picture: person["photos"].first["url"], type: "small-card", tag: "beta", history: history_1}
      cards.push(card)
    end
    gon.cards = cards
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

  def update_twitter_handle
    contact = Contact.find(params[:id])
    handle = params[:handle]
    contact.twitter_handle = handle
    if contact.save
      render text: "Success"
    else
      render text: "Failure"
    end
  end

  def create
    @contact = Contact.new(params[:contact])
    api_key = "62f8b707449cd237"

    person = HTTParty.get('https://api.fullcontact.com/v2/person.json?email=' + @contact.email + '&apiKey=' + api_key).body
    puts "RESPONSE: " + person.to_s
    @contact.person = person

    @person = JSON.parse(person)
    if @person["socialProfiles"] 
      @person["socialProfiles"].each do |profile|
        if profile["type"] == "twitter"
          @contact.twitter_handle = profile["username"]
        end
      end
    end


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
    deep_text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
    history1 = {user_id: 3, outgoing: true, type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32kzdfheatj"}
    history2 = {user_id: 3, outgoing: false, type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop", deep_text: deep_text}
    history3 = {user_id: 3, outgoing: true, type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history4 = {user_id: 3, outgoing: false, type: "phone", id: 4, icon: "phone.png", text: "Call on 04/10/13: 47 minutes"}
    history5 = {user_id: 3, outgoing: true, type: "calendar", id: 5, icon: "calendar.png", text: "Interview on 04/03/13"}
    history6 = {user_id: 3, outgoing: false, type: "gmail", id: 6, icon: "gmail.png", text: "FWD: Request for an interview with the founder of Threadstop", deep_text: deep_text}
    history7 = {user_id: 3, outgoing: true, type: "calendar", id: 7, icon: "calendar.png", text: "Meeting on 02/17/13: Go over terms"}
    history8 = {user_id: 3, outgoing: false, type: "gmail", id: 8, icon: "gmail.png", text: "Interested in investing in a fast paced startup?", deep_text: deep_text}
    history9 = {user_id: 3, outgoing: false, type: "phone", id: 9, icon: "phone.png", text: "Call on 03/20/13: 20 minutes"}
    gon.history = [history1, history2, history3, history4, history5, history6, history7, history8, history9]
    gon.gmail = {oauth: true, contact_email: "akashbad4123@gmail.com", contact_name: @person["contactInfo"]["fullName"], user_email: "me@delian.io", user_name: "Delian Asparouhov"}
    gon.twitter = {oauth: (current_user.authentications.where(provider: "twitter").length > 0), user_connected: @contact.twitter_handle.nil?, contact_handle: @contact.twitter_handle.to_s, contact_name: @person["contactInfo"]["fullName"], user_handle: "@mitdelian", user_name: "Delian Asparouhov"}
    gon.twitter = {oauth: true , user_connected: false, contact_handle: @contact.twitter_handle.to_s, contact_name: @person["contactInfo"]["fullName"], user_handle: "@mitdelian", user_name: "Delian Asparouhov"}

    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end

  def contact
    history1 = {user_id: 3, type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32k"}
    history2 = {user_id: 3, type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {user_id: 3, type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history_1 = [history1, history2, history3]

    history4 = {user_id: 3, type: "phone", id: 4, icon: "phone.png", text: "Call on 04/10/13: 47 minutes"}
    history5 = {user_id: 3, type: "calendar", id: 5, icon: "calendar.png", text: "Interview on 04/03/13"}
    history6 = {user_id: 3, type: "gmail", id: 6, icon: "gmail.png", text: "RE: Request for an interview with the founder of Threadstop"}
    history_2 = [history4, history5, history6]

    history7 = {user_id: 3, type: "calendar", id: 7, icon: "calendar.png", text: "Meeting on 02/17/13: Go over terms"}
    history8 = {user_id: 3, type: "gmail", id: 8, icon: "gmail.png", text: "RE: Interested in investing in a fast paced startup?"}
    history9 = {user_id: 3, type: "phone", id: 9, icon: "phone.png", text: "Call on 03/20/13: 20 minutes"}
    history_3 = [history7, history8, history9]

    ryan = {user_id: 3, name: "Ryan Lau", picture: "https://api.twitter.com/1/users/profile_image?screen_name=ryanmlau&size=reasonably_small", type: "small-card", tag: "beta", history: history_1}
    heinz = {user_id: 3, name: "Matt Heinz", picture: "https://api.twitter.com/1/users/profile_image?screen_name=heinzmarketing&size=reasonably_small", type: "small-card", tag: "advisor", history: history_1}
    dharmesh = {user_id: 3, name: "Dharmesh Shah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=dharmesh&size=reasonably_small", type: "small-card", tag: "investor", history: history_1}
    dyor = {user_id: 3, name: "Matt Dyor", picture: "https://api.twitter.com/1/users/profile_image?screen_name=mattdyor&size=reasonably_small", type: "small-card", tag: "advisor", history: history_1}
    tim = {user_id: 3, name: "Tim Moody", picture: "https://api.twitter.com/1/users/profile_image?screen_name=timlmoody&size=reasonably_small", type: "small-card", tag: "reporter", history: history_1}
    delian = {user_id: 3, name: "Delian Asparouhov", picture: "https://api.twitter.com/1/users/profile_image?screen_name=mitdelian&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    aziz = {user_id: 3, name: "Aziz Ansari", picture: "https://api.twitter.com/1/users/profile_image?screen_name=azizansari&size=reasonably_small", type: "medium-card", tag: "beta", history: history_2}
    paul = {user_id: 3, name: "Paul Graham", picture: "https://api.twitter.com/1/users/profile_image?screen_name=paulg&size=reasonably_small", type: "medium-card", tag: "investor", history: history_2}
    jon = {user_id: 3, name: "Jon Froehlich", picture: "https://api.twitter.com/1/users/profile_image?screen_name=jonfroehlich&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    nate = {user_id: 3, name: "Nate Silver", picture: "https://api.twitter.com/1/users/profile_image?screen_name=fivethirtyeight&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    buzz = {user_id: 3, name: "Buzz Aldrin", picture: "https://api.twitter.com/1/users/profile_image?screen_name=therealbuzz&size=reasonably_small", type: "medium-card", tag: "beta", history: history_2}
    bill = {user_id: 3, name: "Bill Nye", picture: "https://api.twitter.com/1/users/profile_image?screen_name=thescienceguy&size=reasonably_small", type: "medium-card", tag: "advisor", history: history_2}
    akash = {user_id: 3, name: "Akash Badshah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=akashbad&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    john = {user_id: 3, name: "John Resig", picture: "https://api.twitter.com/1/users/profile_image?screen_name=jeresig&size=reasonably_small", type: "large-card", tag: "beta", history: history_3}
    brad = {user_id: 3, name: "Brad Feld", picture: "https://api.twitter.com/1/users/profile_image?screen_name=bfeld&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    barack = {user_id: 3, name: "Barack Obama", picture: "https://api.twitter.com/1/users/profile_image?screen_name=barackobama&size=reasonably_small", type: "large-card", tag: "advisor", history: history_3}
    peter = {user_id: 3, name: "Peter Thiel", picture: "https://api.twitter.com/1/users/profile_image?screen_name=peterthiel&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    nilay = {user_id: 3, name: "Nilay Patel", picture: "https://api.twitter.com/1/users/profile_image?screen_name=reckless&size=reasonably_small", type: "large-card", tag: "reporter", history: history_3}
    victor = {user_id: 3, name: "Victor Pontis", picture: "https://api.twitter.com/1/users/profile_image?screen_name=viccypont&size=reasonably_small", type: "large-card", tag: "advisor", history: history_3}

    @people = [ryan, heinz, dharmesh, dyor, tim, delian, aziz, paul, jon, nate, buzz, bill, akash, john, brad, barack, peter, nilay, victor]
    render json: @people
  end

  def tags
    @tags = {tags: ['Investor', 'Beta', 'Advisor', 'Reporter'] }
    render json: @tags
  end

  def history
    history1 = {user_id: 3, type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32kzdfheatj"}
    history2 = {user_id: 3, type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {user_id: 3, type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history4 = {user_id: 3, type: "phone", id: 4, icon: "phone.png", text: "Call on 04/10/13: 47 minutes"}
    history5 = {user_id: 3, type: "calendar", id: 5, icon: "calendar.png", text: "Interview on 04/03/13"}
    history6 = {user_id: 3, type: "gmail", id: 6, icon: "gmail.png", text: "RE: Request for an interview with the founder of Threadstop"}
    history7 = {user_id: 3, type: "calendar", id: 7, icon: "calendar.png", text: "Meeting on 02/17/13: Go over terms"}
    history8 = {user_id: 3, type: "gmail", id: 8, icon: "gmail.png", text: "RE: Interested in investing in a fast paced startup?"}
    history9 = {user_id: 3, type: "phone", id: 9, icon: "phone.png", text: "Call on 03/20/13: 20 minutes"}
    @history = [history1, history2, history3, history4, history5, history6, history7, history8, history9]
    render json: @history
  end

  def twitter
    render json: {oauth: true, user_connected: true, user_handle: "@ryanmlau", my_handle: "@akashbad"}
  end
end