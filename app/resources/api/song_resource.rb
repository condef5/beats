class Api::SongResource < JSONAPI::Resource
  attribute :id
  attributes :name, :url, :image, :corrupt_song, :duration

  filter :corrupt_song, default: "false"

  def self.default_sort
    [{ field: 'created_at', direction: :desc }]
  end

  before_create do
    @model.user_id = context[:current_user].id
  end
end
