app.Router = Backbone.Router.extend({
  routes: {
    ''          : 'showIndex',
    'user/:id'  : 'showUser'
  },

  showIndex: function() {
    var user_list = new app.collections.UserList();
    user_list.fetch({
      success: function(user_list) {
        // user_list.models[0].setFullName();
        var view = new app.views.UserListView({
          collection: user_list
        });

        $('#content').html = "";
        $('#content').html(view.render().el);
      }
    });

  },

  showUser: function(id) {
    me = new app.models.User({id : id});
    me.fetch({
      success: function(me) {
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

        // me.save();

        $('#content').html(userView.render().el);
        $('#content').append(projectListView.render().el);

      }
    });
  }
});