app.views.UserView = Backbone.View.extend({

  tagName: 'div',
  className: 'user',
  template: _.template($('#user-template').html()),
  events: {
    'click #bio img' : 'editImageURL',
    'change #edit-user-image-url' : 'updateImageURL',
    'click h1.name' : 'editName',
    'change #edit-user-name' : 'updateName',
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
    $('#edit-user-image-url').removeClass("hidden-edit").val(text);

    img.hide();
  },

  updateImageURL: function(event) {
    this.model.set("imageURL", $('#edit-user-image-url').val());
  },

  editName: function(event) {
    var h1 = $(event.currentTarget);
    $('#edit-user-name').removeClass("hidden-edit").val(h1.html());

    h1.hide();
  },

  updateName: function(event) {
    this.model.set("fullName", $('#edit-user-name').val());
  },

  editBio: function(event) {
    var h2 = $(event.currentTarget);
    $('#edit-user-bio').removeClass("hidden-edit").val(h2.html());

    h2.hide();
  },

  updateBio: function(event) {
    this.model.set("bio", $('#edit-user-bio').val());
  },

  editMission: function(event) {
    var h3 = $(event.currentTarget);
    $('#edit-user-mission').removeClass("hidden-edit").val(h3.html());

    h3.hide();
  },

  updateMission: function(event) {
    this.model.set("mission", $('#edit-user-mission').val());
  }

});