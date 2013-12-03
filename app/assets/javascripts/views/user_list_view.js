app.views.UserListView = Backbone.View.extend({

  tagName: 'div',
  className: 'user-list',
  template: JST['templates/user_list'],

  events: {
    'click .user-show': 'showUser'
  },

  render: function() {

    this.$el.html(this.template({
      collection: this.collection
    }));

    return this;
  },

  showUser: function(event) {
    event.preventDefault();
    var router = new app.Router();
    router.navigate("user/" + $(event.currentTarget).data("id"), {trigger: true});
  }

});