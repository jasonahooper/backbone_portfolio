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
    for(var i=0; i < response.length; i++) {
      response[i].id = response[i].id.toString();
      response[i].user_id = response[i].user_id.toString();
    }
    return response;
  }

});