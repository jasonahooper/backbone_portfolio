app.views.SkillListView = Backbone.View.extend({

  tagName: 'div',
  className: 'skill-list',
  template: JST['templates/skill_list'],

  render: function() {
    this.$el.html(this.template());

    var _this = this;
    this.collection.forEach(function(skill) {
      var view = new app.views.SkillView({model: skill});
      _this.$el.append(view.render().el);
    });

    return this;
  },

});