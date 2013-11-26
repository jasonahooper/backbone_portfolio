app.views.UserView = Backbone.View.extend({

  tagName: 'div',
  className: 'user',
  template: _.template($('#user-template').html()),
  events: {
    'click h1.name' : 'editName',
    'change #edit-user-name' : 'updateName',
    'click h2.bio' : 'editBio',
    'change #edit-user-bio' : 'updateBio',
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

});