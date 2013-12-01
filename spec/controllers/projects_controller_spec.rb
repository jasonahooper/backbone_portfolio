require 'spec_helper'

describe ProjectsController do

  describe 'CREATE accepts nested attributes for Skills' do
    before do
      user = User.create!(:first_name => 'Test')

      params = { :project => {
        :title => 'test save', :user_id => user.id,
        :skills_attributes =>  [
          { :skill => 'Ruby' }, {:skill => 'Rails'}, {:skill => 'HTML'}
        ]
      }}

      post :create, params
    end

    it 'saves the Project' do
      expect(Project.count).to eq(1)
      expect(Project.first.title).to eq('test save')
    end
    it 'saves the Skills' do
      p = Project.first
      expect(p.skills.count).to eq(3)
      expect(p.skills[0].skill).to eq('Ruby')
    end
  end

  describe 'SHOW returns nested attributes for Skills' do
    before do
      user = User.create!(:first_name => 'Test')
      @project = Project.create(:user_id => user.id, :title => 'test index')
      @project.skills << Skill.new(:skill => 'Ruby')
      @project.skills << Skill.new(:skill => 'Rails')

      params = { :id => @project.id }

      get :show, params
    end

    it 'responds with json for the Project' do
      expect(JSON(response.body)['id']).to eq(@project.id)
    end

    it 'retrieves all Project Skills' do
      expect(JSON(response.body)["skills"].count).to eq(2)
      expect(JSON(response.body)["skills"][0]["skill"]).to eq('Ruby')
      expect(JSON(response.body)["skills"][1]["skill"]).to eq('Rails')
    end

  end

end