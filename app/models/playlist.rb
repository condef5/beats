class Playlist < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :songs
end

# == Schema Information
#
# Table name: playlists
#
#  id         :bigint           not null, primary key
#  bg         :string
#  color      :string
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_playlists_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
