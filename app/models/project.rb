class Project < ActiveRecord::Base
  has_many :skills
  accepts_nested_attributes_for :skills
end
