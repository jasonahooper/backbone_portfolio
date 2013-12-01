class ProjectsController < ApplicationController

  def index
    render :json => Project.all
  end

  def show
    project = Project.find(params[:id])
    render :json => project, :methods => :skills
  end

  def create
    Project.create!(project_params)
    render :nothing => true
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
    render :nothing => true
  end

  def update
    project = Project.find(params[:id])
    project.update_attributes!(project_params)
    render :nothing => true
  end

  private

  def project_params
    params.require(:project).permit(:url, :title, :body, :user_id,
      :skills_attributes => [:skill] )
  end

end
