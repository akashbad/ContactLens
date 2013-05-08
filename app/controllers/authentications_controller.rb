class AuthenticationsController < ApplicationController
  def index
    @authentications = Authentication.all
  end

  def create
    @authentication = current_user.authentications.new(:provider => params['provider'], 
                                                       :oauth_token => request.env["omniauth.auth"]["credentials"]["token"],
                                                       :oauth_token_secret => request.env["omniauth.auth"]["credentials"]["secret"])
    if @authentication.save
      auth = current_user.authentications.where(provider: "twitter").first
      twitter = Twitter::Client.new(
        :oauth_token => auth.oauth_token,
        :oauth_token_secret => auth.oauth_token_secret
      )
      user = twitter.user
      current_user.twitter_handle = user["username"]
      current_user.full_name = user["name"]
      current_user.save
      redirect_to edit_user_registration_path, :notice => "Successfully created authentication."
    else
      render :action => 'new'
    end
  end

  def destroy
    @authentication = Authentication.find(params[:id])
    @authentication.destroy
    redirect_to edit_user_registration_path, :notice => "Successfully destroyed authentication."
  end
end
