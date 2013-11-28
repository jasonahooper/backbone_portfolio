$(document).ready(function() {

  var me = new app.models.User({
    firstName: "Jason",
    lastName: "Hooper",
    bio: "Junior Web Developer from Cardiff, Wales.",
    mission: "To find a position where my skills are appreciated and I may continue developing.",
    imageURL: "uploads/JasonHooper.jpg"
  });
  me.save();
  me.setFullName();

  me.projects.create({
    title: "Bucketlist",
    url: "https://github.com/dmgarland/BucketListApp",
    body: "<p>I worked on a Rails application that created a todo list of things I want to do before I die.</p> <ul> <li>I integrated Google maps and used Geocoding to determine where my activities would take place.</li> <li>I used AJAX to asynchronously update markers on the map when the center changed.</li> <li>I displayed crime statistics on a chart using an API call and Morris.js</li> </ul>"
  });

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