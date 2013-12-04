app.views.LikeListView = Backbone.View.extend({

  tagName: 'div',
  className: 'like-list',
  template: JST['templates/like_list'],

  events: {
  },

  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function() {

    this.$el.html(this.template({
      collection: this.collection
    }));

    return this;
  }

});