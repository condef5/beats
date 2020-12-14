class HomeController < ApplicationController
  include JrHelper

  def index
    @songs = Song.order(id: :desc).take(10)
    @initial_songs = json_resources(Api::SongResource, @songs)
  end
end
