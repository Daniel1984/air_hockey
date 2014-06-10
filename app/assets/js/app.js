var parser = require('user-agent-parser');
var Engine = require('./engine');

window.AH = {
  device: parser(navigator.userAgent).device.type,
  wWidth: window.innerWidth,
  wHeight: window.innerHeight,

  isMobile: function() {
    if(AH.device && AH.device === 'mobile') return true;
    return false;
  },

  getWidth: function() {
    return AH.wWidth;
  },

  getHeight: function() {
    return AH.wHeight;
  }
};

window.addEventListener('load', function() {
  if(!AH.isMobile()) document.body.className = 'desktop';
  var game = new Engine();
  this.addEventListener('resize', game.resize, false);
  this.addEventListener('orientationchange', game.resize, false);
}, false);
