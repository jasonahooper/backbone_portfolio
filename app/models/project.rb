class Project < ActiveRecord::Base
  def as_json(options = {})
    # super({:include => :skills, :only => [ :title ]}.merge(options))
    super({:include => :skills}.merge(options))
  end

  belongs_to :user
  has_many :skills, :dependent => :destroy
  accepts_nested_attributes_for :skills
end
