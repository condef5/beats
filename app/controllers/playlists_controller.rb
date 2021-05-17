class PlaylistsController < ApplicationController
  before_action :set_playlist, only: %i[edit show update destroy]

  def index
    @playlists = current_user.playlists
  end

  def new
    @playlist = Playlist.new
  end

  def show
  end

  def edit
  end

  def create
    @playlist = current_user.playlists.new(playlist_params)

    if @playlist.save
      redirect_to @playlist, notice: 'Playlist was successfully created.'
    else
      render :new
    end
  end

  def update
    if @playlist.update(playlist_params)
      redirect_to @playlist, notice: 'Playlist was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @playlist.destroy
    redirect_to playlists_url, notice: 'Playlist was successfully destroyed.'
  end

  private

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end

  def playlist_params
    params.require(:playlist).permit(:name)
  end
end
