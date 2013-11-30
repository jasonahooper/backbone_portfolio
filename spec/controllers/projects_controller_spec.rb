require 'spec_helper'

describe ProjectsController do

  describe 'accepts nested attributes for Skills' do
    before do
      user = User.create!(:first_name => 'Test')

      params = { :project => {
        :title => 'test project', :user_id => user.id,
        :skills_attributes =>  [
          { :skill => 'Ruby' }, {:skill => 'Rails'}, {:skill => 'HTML'}
        ]
      }}

      post :create, params
    end

    it 'saves the Project' do
      expect(Project.count).to eq(1)
      expect(Project.first.title).to eq('test project')
    end
    it 'saves the Skills' do
      p = Project.first
      expect(p.skills.count).to eq(3)
      expect(p.skills[0].skill).to eq('Ruby')
    end
  end

  describe 'returns nested attributes for Skills'

end