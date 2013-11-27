app.models.User = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage('portfolio-user'),

  initialize: function() {
    this.projects = new app.collections.ProjectList();
    this.projects.user = this;
    this.bind("change:firstName change:lastName", this.setFullName);
  },

  setFullName: function() {
    this.set("fullName", this.getName());
  },

  getName: function() {
    if (this.get("firstName") && this.get("lastName")) {
      return this.get("firstName") + " " + this.get("lastName");
    }
    else if (this.get("firstName")) {
      return this.get("firstName");
    }
    else {
      return this.get("lastName");
    }
  },

  validate: function(attrs) {
    if(attrs.firstName === undefined) {
      return { message: "First Name must be defined." };
    };
    if(attrs.lastName === undefined) {
      return { message: "Last Name must be defined." };
    };
    if(attrs.bio === undefined) {
      return { message: "Bio must be defined." };
    };
    if(attrs.mission === undefined) {
      return { message: "Mission must be defined." };
    };
    if(attrs.imageURL === undefined) {
      return { message: "Image URL must be defined." };
    };
  }
});