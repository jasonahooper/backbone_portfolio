class UsersController < ApplicationController
  def index
    render :json => User.all
  end

  def update
    user = User.find(params[:id])
    user.update_attributes!(user_params)
    render :nothing => true
  end

  private
  def user_params
    params.permit(:first_name, :last_name, :bio, :mission, :image_url)
  end
end
