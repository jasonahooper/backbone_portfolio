app.collections.SkillList = Backbone.Collection.extend({

  url: '/skills',

  model: app.models.Skill

});