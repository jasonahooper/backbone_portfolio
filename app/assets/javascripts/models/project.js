app.models.Project = Backbone.Model.extend({

  urlRoot: '/projects',

  initialize: function() {
    this.bind("change", this.updateTitle);
    this.skills = this.skills || new app.collections.SkillList();
    this.skills.project = this;
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
    if (response.skills) {
      if (!this.skills) {
        this.skills = new app.collections.SkillList();
      }
      for (var i=0; i<response.skills.length; i++) {
        this.skills.add({
          id: response.skills[i].id,
          project_id: response.skills[i].project_id,
          skill: response.skills[i].skill
        });
      }
    }
    response.id = response.id.toString();
    response.user_id = response.user_id.toString();
    return response;
  },

  toJSON: function() {
    // this cost me an hour!
    // this.attributes.skills_attributes = this.attributes.skills;
    this.attributes.skills_attributes = this.skills;
    return { project: this.attributes };
  }

});