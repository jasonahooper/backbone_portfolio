app.views.UserView = Backbone.View.extend({

  tagName: 'div',
  className: 'user',
  template: _.template($('#user-template').html()),

  render: function() {
    var template_html = this.template({
      user: this.model.attributes
    });

    this.$el.html(template_html);
    return this;
  }

});