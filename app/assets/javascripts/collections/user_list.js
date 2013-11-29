app.collections.UserList = Backbone.Collection.extend({

  url: '/users',

  model: app.models.User,

  initialize: function() {
    this.bind("add", this.setFullName);
  },

  parse: function(response, options) {
    console.log("user_list.js parse : " + response.type);
    for(var i=0; i < response.length; i++) {
      response[i].firstName = response[i].first_name;
      response[i].lastName = response[i].last_name;
      response[i].id = response[i].id.toString();
      response[i].imageURL = response[i].image_url;
    }

    return response;
  },

  setFullName: function(model) {
    model.setFullName();
  }

});