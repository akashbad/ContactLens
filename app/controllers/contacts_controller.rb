class ContactsController < ApplicationController
  before_filter :authenticate_user!
  
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

  def show
    @contact = Contact.find(params[:id])
    @person = FullContact.person(email: @contact.email)

    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end

  def contact
    history1 = {type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32k"}
    history2 = {type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history = [history1, history2, history3]
    person = {name: "Akash Badshah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=akashbad&size=reasonably_small", tag: "investor", type: "medium-card", history: history}
    people = [person, person, person, person, person]
    render json: people
  end

  def tags
    @tags = {tags: ['Investor', 'Beta', 'Advisor', 'Reporter'] }
    render json: @tags
  end
end