class Api::SongResource < JSONAPI::Resource
  attributes :name, :url, :image, :duration

  def self.default_sort
    [{ field: 'created_at', direction: :desc }]
  end

  before_create do
    @model.user_id = context[:current_user].id
  end
end
