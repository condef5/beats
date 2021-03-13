class UsersController < Clearance::UsersController
  layout "sessions"

  def create
    @user = user_from_params

    if @user.save
      sign_in @user
      redirect_back_or url_after_create
    else
      flash[:alert] = @user.errors.full_messages.first
      render :new
    end
  end
end
