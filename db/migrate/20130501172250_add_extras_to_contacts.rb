class AddExtrasToContacts < ActiveRecord::Migration
  def change
      add_column :contacts, :person, :text
  end
end
