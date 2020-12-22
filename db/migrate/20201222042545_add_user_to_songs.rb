class AddUserToSongs < ActiveRecord::Migration[6.0]
  def change
    add_reference :songs, :user, null: false, foreign_key: true
  end
end
