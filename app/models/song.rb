class Song < ApplicationRecord
  # callbacks
  before_create :set_video_info

  # validations
  validates :url, presence: true, uniqueness: true

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
#  id         :bigint           not null, primary key
#  duration   :string
#  image      :string
#  name       :string
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
