app.collections.ProjectList = Backbone.Collection.extend({

  model: app.models.Project,
  localStorage: new Backbone.LocalStorage('portfolio-project'),
  initialize: function(what) {
    this.bind({
      "add": this.gotAdd
    });
  },

  gotAdd: function(model) {
    if (this.user) {
      this.user.save();
      model.set("user_id", this.user.id);
    }
  }

});