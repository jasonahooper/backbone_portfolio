app.views.FollowerView = Backbone.View.extend({

  tagName: 'li',
  className: 'follower',
  template: JST['templates/follower'],
  events: {
  },

  initialize: function() {
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});