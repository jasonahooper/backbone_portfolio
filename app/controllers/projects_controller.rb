class ProjectsController < ApplicationController
  def create
    Project.create!(project_params)
    render :nothing => true
  end

  private
  def project_params
    params.permit(:url, :title, :body, :user_id)
  end
end
