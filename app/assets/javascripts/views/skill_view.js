app.views.SkillView = Backbone.View.extend({

  tagName: 'li',
  className: 'skill',
  template: JST['templates/skill'],

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },

});