class AddGithubToUser < ActiveRecord::Migration
  def change
    add_column :users, :github_id, :integer
    add_column :users, :github_access_token, :string
  end
end
