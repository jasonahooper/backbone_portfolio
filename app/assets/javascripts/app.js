$(document).ready(function() {

  if (window.location.hash && window.location.hash == '#_=_') {
      window.location.hash = '';
  }

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

