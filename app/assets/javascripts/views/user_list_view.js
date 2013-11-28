app.views.UserListView = Backbone.View.extend({

  tagName: 'div',
  className: 'user-list',
  template: _.template($("#user-list-template").html()),

  events: {
    'click .user-show': 'showUser'
  },

  initialize: function() {
    // this.listenTo(this.collection, 'change', this.render);
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