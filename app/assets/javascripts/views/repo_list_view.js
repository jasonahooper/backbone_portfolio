app.views.RepoListView = Backbone.View.extend({

  tagName: 'div',
  className: 'repo-list',
  template: JST['templates/repo_list'],

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