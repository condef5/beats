class AddValidToSongs < ActiveRecord::Migration[6.0]
  def change
    add_column :songs, :corrupt_song, :boolean, default: false
  end
end
