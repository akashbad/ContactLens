class AuthenticationsController < ApplicationController
  def index
    @authentications = Authentication.all
    redirect_to "/contacts"
  end

  def create
    @authentication = current_user.authentications.new(:provider => params['provider'], 
                                                       :oauth_token => request.env["omniauth.auth"]["credentials"]["token"],
                                                       :oauth_token_secret => request.env["omniauth.auth"]["credentials"]["secret"])
    if @authentication.save
      redirect_to authentications_url, :notice => "Successfully created authentication."
    else
      render :action => 'new'
    end
  end

  def destroy
    @authentication = Authentication.find(params[:id])
    @authentication.destroy
    redirect_to authentications_url, :notice => "Successfully destroyed authentication."
  end
end
