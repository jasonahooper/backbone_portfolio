app.Router = Backbone.Router.extend({
  routes: {
    ''          : 'showIndex',
    '/index'    : 'showIndex',
    '/user:id'  : 'showUser'
  },

  showIndex: function() {
    var user_list = new app.collections.UserList();
    user_list.fetch();

    var view = new app.views.UserListView({
      collection: user_list
    });

    $('#content').html = "";
    $('#content').html(view.render().el);
  },

  showUser: function(user) {
    user.fetch();
    // if (me.values().length === 0) {
    //   me = new app.models.User({
    //     firstName: "Jason",
    //     lastName: "Hooper",
    //     bio: "Junior Web Developer from Cardiff, Wales.",
    //     mission: "To find a position where my skills are appreciated and I may continue developing.",
    //     imageURL: "uploads/JasonHooper.jpg"
    //   });
    //   me.setFullName();
    //   me.save();
    // }

    var userView = new app.views.UserView({
      model: me
    });

    var projectListView = new app.views.ProjectListView({
      collection: me.projects
    });

    me.save();

    $('#user-profile').html(userView.render().el);
    $('#project-list').html(projectListView.render().el);
  }
});