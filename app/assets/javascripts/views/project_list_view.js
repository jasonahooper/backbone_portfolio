app.views.ProjectListView = Backbone.View.extend({

  tagName: 'div',
  className: 'project-list',
  template: JST['templates/project_list'],

  events: {
    'click #add-project': 'newProject'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'remove', this.render);
  },

  render: function() {

    var _this = this;

    this.$el.html(this.template());

    this.collection.forEach(function(project) {
      var view = new app.views.ProjectView({model: project});
      _this.$el.append(view.render().el);
    });

    return this;
  },

  newProject: function() {
    this.collection.add({
      title: "New Project",
      url: "Click to edit",
      body: "Click to edit"
    });
  }
});