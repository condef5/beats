class CreateSongs < ActiveRecord::Migration[6.0]
  def change
    create_table :songs do |t|
      t.string :url, null: false
      t.string :name
      t.string :image
      t.string :duration

      t.timestamps
    end
  end
end
