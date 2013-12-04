app.collections.LikeList = Backbone.Collection.extend({

  url: '/likes',

  model: app.models.Like

});