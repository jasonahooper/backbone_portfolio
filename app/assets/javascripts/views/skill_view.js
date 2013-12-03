app.views.SkillView = Backbone.View.extend({

  tagName: 'li',
  className: 'skill',
  template: JST['templates/skill'],

  events: {
    'click .delete': 'removeSkill',
    'click .name': 'editSkill',
    'change .edit-skill': 'updateSkill'
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },

  removeSkill: function() {
    this.model.collection.remove(this.model);
    this.model.destroy();
  },

  editSkill: function(event) {
    event.currentTarget.hidden = true;
    $(event.currentTarget.parentNode).find('.hidden-edit').
      removeClass('hidden-edit').focus();
  },

  updateSkill: function(event) {
    this.model.set('skill',event.currentTarget.value);
    this.model.collection.project.save();
  }

});