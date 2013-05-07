class Tag < ActiveRecord::Base
  attr_accessible :text, :user_id
  belongs_to :user
  has_many :tags_contact
  has_many :contacts, :through => :tags_contact
end 
