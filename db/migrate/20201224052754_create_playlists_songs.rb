class CreatePlaylistsSongs < ActiveRecord::Migration[6.0]
  def change
    create_join_table :playlists, :songs, column_options: { null: false, foreign_key: true } do |t|
      t.index :song_id
      t.index :playlist_id
    end
  end
end
