app.collections.UserList = Backbone.Collection.extend({

  url: '/users',

  model: app.models.User,

  initialize: function() {
    this.bind({
      "add": this.setFullName
    });
  },

  parse: function(response, options) {
    for(var i=0; i < response.length; i++) {
      response[i].firstName = response[i].first_name;
      response[i].lastName = response[i].last_name;
    }

    return response;
  },

  setFullName: function(model) {
    model.setFullName();
  }

});