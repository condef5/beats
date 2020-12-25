class CreatePlaylists < ActiveRecord::Migration[6.0]
  def change
    create_table :playlists do |t|
      t.string :name, null: false
      t.string :color
      t.string :bg
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
