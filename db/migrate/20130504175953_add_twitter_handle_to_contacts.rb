class AddTwitterHandleToContacts < ActiveRecord::Migration
  def change
    add_column :contacts, :twitter_handle, :string
  end
end
