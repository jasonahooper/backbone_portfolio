$(document).ready(function() {

  var router = new app.Router();
  Backbone.history.start();
  router.navigate('');

});


$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
options.crossDomain ={
crossDomain: true
};
options.xhrFields = {
withCredentials: true
};
});