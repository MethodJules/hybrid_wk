(function ($, Drupal, drupalSettings) {

  'use strict';
  let initialized;

  function init() {

    // add hybridwk image to the block
    $('#block-hybridewssvgblock .content').append('' +
      '<a id="blockwk" href=""><img src="'+ drupalSettings.hybride_ws_wissenskarte.wkUrl + '">');

    // redirect to the previous page on click // TODO
    $('#blockwk').click(function() {
      window.history.back();
      return false;
    });
  }

  Drupal.behaviors.mybehavior = {
    attach: function (context, settings) {
      if(!initialized) {
        initialized = true;

        init();
      }
    }
  };

})(jQuery, Drupal, drupalSettings);
