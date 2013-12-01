app.views.UserView = Backbone.View.extend({

  tagName: 'div',
  className: 'user',
  template: JST['templates/user'],
  events: {
    'click #bio img' : 'editImageURL',
    'change #edit-user-image-url' : 'updateImageURL',
    'click h1.name' : 'editName',
    'change #edit-user-first-name' : 'updateName',
    'change #edit-user-last-name' : 'updateName',
    'click h2.bio' : 'editBio',
    'change #edit-user-bio' : 'updateBio',
    'click h3.mission' : 'editMission',
    'change #edit-user-mission' : 'updateMission'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var template_html = this.template({
      user: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  },

  editImageURL: function(event) {
    var text = event.currentTarget.getAttribute("src");
    var img = $(event.currentTarget);
    $('#edit-user-image-url').removeClass("hidden-edit").val(text.trim());

    img.hide();
  },

  updateImageURL: function(event) {
    this.model.set("imageURL", $('#edit-user-image-url').val());
  },

  editName: function(event) {
    var h1 = $(event.currentTarget);
    $('#edit-user-first-name').removeClass("hidden-edit").
      val(this.model.get("firstName"));
    $('#edit-user-last-name').removeClass("hidden-edit").
      val(this.model.get("lastName"));

    h1.hide();
  },

  updateName: function(event) {
    if (event.currentTarget.id === "edit-user-first-name") {
      this.model.set("firstName", $('#edit-user-first-name').val());
    } else {
      this.model.set("lastName", $('#edit-user-last-name').val());
    }
  },

  editBio: function(event) {
    var h2 = $(event.currentTarget);
    $('#edit-user-bio').removeClass("hidden-edit").val(h2.html().trim());

    h2.hide();
  },

  updateBio: function(event) {
    this.model.set("bio", $('#edit-user-bio').val());
  },

  editMission: function(event) {
    var h3 = $(event.currentTarget);
    $('#edit-user-mission').removeClass("hidden-edit").val(h3.html().trim());

    h3.hide();
  },

  updateMission: function(event) {
    this.model.set("mission", $('#edit-user-mission').val().trim());
  },

  parse: function(response) {
    console.log("user_view parse");
  }

});