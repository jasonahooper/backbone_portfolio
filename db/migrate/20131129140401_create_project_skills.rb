class CreateProjectSkills < ActiveRecord::Migration
  def change
    create_table :project_skills do |t|
      t.integer :project_id
      t.string :skill

      t.timestamps
    end
  end
end
