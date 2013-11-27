app.views.ProjectListView = Backbone.View.extend({

  tagName: 'div',
  className: 'project-list',

  render: function() {
    this.projects.forEach(function(project) {
      var view = new app.views.ProjectView({model: project});
      this.$el.append(view.render().el);
    });
  }
});