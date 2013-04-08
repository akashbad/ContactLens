class ContactsController < ApplicationController
  def index
    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end
  
  def approve
    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end

  def show
    respond_to do |format|
      format.html { render } # index.html.erb
    end
  end
end