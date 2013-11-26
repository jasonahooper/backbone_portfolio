app.models.User = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage('portfolio-user'),

  initialize: function() {
    this.bind("change", this.setFullName);
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
  }
});