app.collections.RepoList = Backbone.Collection.extend({

  url: '/repos',

  model: app.models.Repo

});