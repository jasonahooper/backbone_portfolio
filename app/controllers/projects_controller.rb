class ProjectsController < ApplicationController

  def index
    render :json => Project.all
  end

  def create
    project = Project.create!(project_params)
    render :json => { :id => project.id }
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
    render :nothing => true
  end

  private

  def project_params
    params.permit(:url, :title, :body, :user_id)
  end

end
