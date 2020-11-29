class Api::SongResource < JSONAPI::Resource
  attributes :name, :url, :image, :duration
end
