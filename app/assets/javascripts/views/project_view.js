app.views.ProjectView = Backbone.View.extend({

  tagName: 'div',
  className: 'project',
  template: JST['templates/project'],
  events: {
    'click .project-name': 'editProjectName',
    'click .remove-project': 'removeProject',
    'keypress .edit-title': 'updateTitle',
    'click .project-url': 'editURL',
    'change .edit-url': 'updateURL'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    var skillListView = new app.views.SkillListView({
      collection: this.model.skills
    });
    this.$('.skills').html(skillListView.render().el);
    return this;
  },

  editProjectName: function() {
    this.$el.addClass('editing');
    this.$el.find('.edit-title').show().focus().prev('h3').hide();
  },

  updateTitle: function() {
    var new_title = this.$el.find('.edit-title').val().trim();
    if(event.which !== 13 || !new_title) {
      return;
    }

    this.model.set('title', new_title);
    this.model.save();
    this.$el.find('.edit-title').val('').hide().prev('h3').show().html(new_title);
  },

  removeProject: function() {
    var collection = this.model.collection;
    this.model.collection.remove(this.model);
    this.model.destroy();
  },

  editURL: function(event) {
    event.preventDefault();
    $(event.currentTarget).hide();
    this.$('.edit-url').removeClass('hidden-edit');
  },

  updateURL: function() {
    this.model.set('url',this.$('.edit-url').val());
    this.model.save();
  }
});