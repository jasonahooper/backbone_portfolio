class Project < ActiveRecord::Base
  has_many :project_skills
  accepts_nested_attributes_for :project_skills
end
