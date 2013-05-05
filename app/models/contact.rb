class Contact < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name
  has_many :history_items

  def full_name
    self.first_name + " " + self.last_name
  end
end
