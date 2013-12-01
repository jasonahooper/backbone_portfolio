class SkillsController < ApplicationController
  def destroy
    skill = Skill.find(params[:id])
    skill.destroy
    render :nothing => true
  end
end
