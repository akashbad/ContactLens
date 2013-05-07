class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :full_name, :string
    add_column :users, :twitter_handle, :string
  end
end
