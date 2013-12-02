class Project < ActiveRecord::Base
  def as_json(options = {})
    # super({:include => :skills, :only => [ :title ]}.merge(options))
    super({:include => :skills}.merge(options))
  end

  has_many :skills
  accepts_nested_attributes_for :skills
end
