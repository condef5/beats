class Api::SongsController < JSONAPI::ResourceController
  include Clearance::Controller

  def context
    { current_user: current_user }
  end
end
