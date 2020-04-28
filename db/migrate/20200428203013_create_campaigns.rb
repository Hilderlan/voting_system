class CreateCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :campaigns do |t|
      t.string :title
      t.text :description
      t.references :user, foreign_key: true
      t.boolean :blocked

      t.timestamps
    end
  end
end
