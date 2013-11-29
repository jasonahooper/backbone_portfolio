app.collections.ProjectList = Backbone.Collection.extend({

  url: '/projects',

  model: app.models.Project,
  initialize: function() {
    this.bind("add", this.gotAdd);
  },

  gotAdd: function(model) {
    if (this.user && model.get("user_id") === undefined) {
      model.set("user_id", this.user.id);
    }
  },

  parse: function(response, options) {
    console.log("project_list.js parse : " + response.type);
    return response;
  }


});