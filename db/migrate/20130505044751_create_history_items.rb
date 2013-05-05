class CreateHistoryItems < ActiveRecord::Migration
  def change
    create_table :history_items do |t|
      t.integer :contact_id
      t.timestamp :timestamp
      t.text :json
      t.string :type

      t.timestamps
    end
  end
end
