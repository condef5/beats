class Song < ApplicationRecord
  # callbacks
  before_create :set_video_info
  belongs_to :user

  # validations
  validates :url, presence: true, uniqueness: { message: "The video url has been taken." }

  private

  def set_video_info
    video_info = VideoInfo.new(url)
    self.name = video_info.title unless self.name?
    self.duration = video_info.duration
    self.image = video_info.thumbnail_medium
  end
end

# == Schema Information
#
# Table name: songs
#
#  id           :bigint           not null, primary key
#  corrupt_song :boolean          default(FALSE)
#  duration     :string
#  image        :string
#  name         :string
#  url          :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_songs_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
