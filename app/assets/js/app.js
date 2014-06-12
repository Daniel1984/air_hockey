var parser = require('user-agent-parser');
var Engine = require('./engine');
var _ = require('underscore');

window.AH = {
  device: parser(navigator.userAgent).device.type,

  isMobile: function() {
    if(AH.device && AH.device === 'mobile') return true;
    return false;
  },

  getWidth: function() {
    return window.innerWidth;
  },

  getHeight: function() {
    return window.innerHeight;
  }
};

window.addEventListener('load', function() {
  if(!AH.isMobile()) document.body.className = 'desktop';
  var game = new Engine();

  var updateLayout = _.debounce(function(e) {
    game.updateLayout();
  }, 500);

//  this.addEventListener('resize', updateLayout, false);
//  this.addEventListener('orientationchange', updateLayout, false);

}, false);
