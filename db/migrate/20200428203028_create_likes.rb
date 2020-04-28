class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.references :campaign, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :kind

      t.timestamps
    end
  end
end
