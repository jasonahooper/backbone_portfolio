class ProjectsController < ApplicationController
  def create
    project = Project.create!(project_params)
    render :json => { :id => project.id }
  end

  private
  def project_params
    params.permit(:url, :title, :body, :user_id)
  end
end
