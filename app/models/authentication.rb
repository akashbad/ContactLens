class Authentication < ActiveRecord::Base
  attr_accessible :user_id, :provider, :oauth_token, :oauth_token_secret
  belongs_to :user
end
