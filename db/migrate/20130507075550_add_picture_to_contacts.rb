class AddPictureToContacts < ActiveRecord::Migration
  def change
    add_column :contacts, :picture, :string
  end
end
