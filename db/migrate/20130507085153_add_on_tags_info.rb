class AddOnTagsInfo < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :user_id
      t.string :text

      t.timestamps
    end
    create_table :tags_contacts do |t|
      t.integer :tag_id
      t.integer :contact_id

      t.timestamps
    end
  end
end
