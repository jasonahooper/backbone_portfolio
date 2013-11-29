app.models.User = Backbone.Model.extend({

  urlRoot: '/users',

  initialize: function() {
    this.projects = new app.collections.ProjectList();
    this.projects.user = this;
    this.bind("sync", this.gotSync);
    this.bind("change:firstName change:lastName", this.gotChange);
  },

  gotSync: function() {
    console.log("gotsync: user");
    this.setFullName();
    var _this = this;
    this.projects.fetch({
      success: function(projects) {
        if (_this.id) {
          var result = projects.where({user_id : _this.id});
          _this.projects = new app.collections.ProjectList(result);
          _this.projects.user = _this;
          return _this.projects;
        }
      }
    });
  },

  gotChange: function() {
    console.log("gotchange: user");
    this.setFullName();
    this.save();
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
    }
    if(attrs.lastName === undefined) {
      return { message: "Last Name must be defined." };
    }
    if(attrs.bio === undefined) {
      return { message: "Bio must be defined." };
    }
    if(attrs.mission === undefined) {
      return { message: "Mission must be defined." };
    }
    if(attrs.imageURL === undefined) {
      return { message: "Image URL must be defined." };
    }
  },

  parse: function(response, options) {
    console.log("user.js parse : " + response.type);

    response.firstName = response.first_name;
    response.lastName = response.last_name;
    response.id = response.id.toString();
    response.imageURL = response.image_url;

    return response;
   }
});