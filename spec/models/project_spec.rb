require 'spec_helper'

describe Project do
  it { should have_many(:skills) }
  it { should accept_nested_attributes_for(:skills) }
end
