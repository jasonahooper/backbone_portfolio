require 'spec_helper'

describe Project do
  it { should have_many(:project_skills) }
  it { should accept_nested_attributes_for(:project_skills) }
end
