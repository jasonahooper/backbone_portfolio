# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = User.create!(:first_name => "Jason", :last_name => "Hooper",
  :bio => "Junior Web Developer from Cardiff, Wales.",
  :mission => "To find a position where my skills are appreciated and I may continue developing.",
  :image_url => "uploads/JasonHooper.jpg")
project = Project.create!(:title => "Test Project", :user_id => user.id)
project.skills << Skill.new(:skill => 'Ruby')
project.skills << Skill.new(:skill => 'Rails')