app.views.FollowerListView = Backbone.View.extend({

  tagName: 'div',
  className: 'follower-list',
  template: JST['templates/follower_list'],

  initialize: function() {
  },

  render: function() {

    var _this = this;

    this.$el.html(this.template());

    this.collection.forEach(function(follower) {
      var view = new app.views.FollowerView({model: follower});
      _this.$el.append(view.render().el);
    });

    return this;
  }
});