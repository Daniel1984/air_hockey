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
    if(AH.isMobile() || AH.wWidth < 720) return AH.wWidth;
    return 720;
  },

  getHeight: function() {
    if(AH.isMobile() || AH.wHeight < 640) return AH.wHeight;
    return 640;
  }
};

window.addEventListener('load', function() {
  if(!AH.isMobile()) document.body.className = 'desktop';
  new Engine();
}, false);
