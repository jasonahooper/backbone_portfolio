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
  }

});