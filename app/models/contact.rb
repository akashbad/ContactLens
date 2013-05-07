class Contact < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name
  has_many :history_items
  belongs_to :user

  def full_name
    self.first_name + " " + self.last_name
  end

  def update_history(current_user)
    if current_user.authentications.where(provider: "twitter").length > 0 && self.twitter_handle
      auth = current_user.authentications.where(provider: "twitter").first
      twitter = Twitter::Client.new(
        :oauth_token => auth.oauth_token,
        :oauth_token_secret => auth.oauth_token_secret
      )
      @history = []
      id = 1
      string = ""
      twitter.user_timeline(self.twitter_handle).first(10).each do |tweet|
        string += tweet.to_s
        tweet = TwitterHistoryItem.find_or_create_by_json_and_contact_id(contact_id: self.id, timestamp: tweet.attrs[:created_at], json: tweet.to_json)
        @history.push(tweet)
      end
      return @history
    else
      return false
    end
  end

end
