app.models.Project = Backbone.Model.extend({

  urlRoot: '/projects',

  initialize: function() {
    this.bind("change", this.updateTitle);
  },

  // updateTitle: function() {
  //   this.attributes.title += " Changed";
  // },

  validate: function() {
    if(this.attributes.url === "") {
      return "Argh!";
    }

    if(this.attributes.title == "") {
      return false;
    }
  },

  parse: function(response, options) {
    console.log("project.js parse : " + response.type);
    response.id = response.id.toString();
    response.user_id = response.user_id.toString();
    return response;
  }


});