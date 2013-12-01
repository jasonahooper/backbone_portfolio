app.views.SkillListView = Backbone.View.extend({

  tagName: 'div',
  className: 'skill-list',
  template: JST['templates/skill_list'],

  events: {
    'click .add-skill': 'newSkill',
    'change #new-skill': 'saveSkill'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'remove', this.render);
  },

  render: function() {
    this.$el.html(this.template());

    var _this = this;
    this.collection.forEach(function(skill) {
      var view = new app.views.SkillView({model: skill});
      _this.$el.append(view.render().el);
    });

    return this;
  },

  newSkill: function() {
    this.$('.hidden-edit').removeClass("hidden-edit");
  },

  saveSkill: function() {
    this.collection.add({
      skill: this.$('#new-skill input').val()
    });
  }

});