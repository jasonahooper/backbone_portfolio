$(document).ready(function() {

  var me = new app.models.User();
  me.fetch();

  if (me.values().length === 0) {
    me = new app.models.User({
      firstName: "Jason",
      lastName: "Hooper",
      bio: "Junior Web Developer from Cardiff, Wales.",
      mission: "To find a position where my skills are appreciated and I may continue developing.",
      imageURL: "uploads/JasonHooper.jpg"
    });
    me.save();
    me.setFullName();
  }

  var userView = new app.views.UserView({
    model: me
  });

  var projectListView = new app.views.ProjectListView({
    collection: me.projects
  });

  me.save();

  $('#user-profile').html(userView.render().el);
  $('#project-list').html(projectListView.render().el);
});