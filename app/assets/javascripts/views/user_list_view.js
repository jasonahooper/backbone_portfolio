app.views.UserListView = Backbone.View.extend({

  tagName: 'div',
  className: 'user-list',
  template: _.template($("#user-list-template").html()),

  events: {
    // 'click #add-project': 'newProject'
  },

  initialize: function() {
    // this.listenTo(this.collection, 'change', this.render);
  },

  render: function() {

    this.$el.html(this.template({
      collection: this.collection
    }));

    return this;
  }

});