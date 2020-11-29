class Song < ApplicationRecord
  # validations
  validates :url, presence: true, uniqueness: true
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
