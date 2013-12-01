app.views.SkillView = Backbone.View.extend({

  tagName: 'li',
  className: 'skill',
  template: JST['templates/skill'],

  events: {
    'click .delete': 'removeSkill'
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },

  removeSkill: function() {
    this.model.collection.remove(this.model);
    this.model.destroy();
  }

});