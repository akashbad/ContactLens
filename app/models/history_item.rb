class HistoryItem < ActiveRecord::Base
  attr_accessible :contact_id, :json, :timestamp, :type
  belongs_to :contact
end
