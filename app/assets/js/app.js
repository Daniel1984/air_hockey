var parser = require('user-agent-parser');
var Engine = require('./engine');
var _ = require('underscore');

window.AH = {
  device: parser(navigator.userAgent).device.type,
  GAME_WIDTH: 768,
  GAME_HEIGHT: 1024,
  GAME_SIDE_BORDER: 56,
  GAME_TOP_BORDER: 32,
  isMobile: function() {
    if(AH.device && AH.device === 'mobile') return true;
    return false;
  },
  getWidth: function() {
    return window.innerWidth;
  },
  getHeight: function() {
    return window.innerHeight;
  },
  getScale: function() {
    return AH.getHeight() / 1024;
  },
  getGameHeight: function() {
    return AH.GAME_HEIGHT * AH.getScale();
  },
  getGameWidth: function() {
    return AH.GAME_WIDTH * AH.getScale();
  },
  getSideBorder: function() {
    return AH.GAME_SIDE_BORDER * AH.getScale();
  },
  getTopBorder: function() {
    return AH.GAME_TOP_BORDER * AH.getScale();
  },
  glpb: function() {
    // get left player bound
    return AH.getWidth() / 2 - AH.getGameWidth() / 2 + AH.getSideBorder();
  },
  grpb: function() {
    // get right player bound
    return AH.getWidth() / 2 + AH.getGameWidth() / 2 - AH.getSideBorder();
  },
  gbpb: function() {
    // get bottom player bound
    return AH.getGameHeight() - AH.getTopBorder();
  },
  gtpb: function() {
    // get top player bound
    return AH.getGameHeight() / 2;
  },
  gtb: function() {
    // get top bound
    return AH.getTopBorder();
  }
};

window.addEventListener('load', function() {
  if(!AH.isMobile()) document.body.className = 'desktop';
  var game = new Engine();

//  var updateLayout = _.debounce(function(e) {
//    game.updateLayout();
//  }, 500);

//  this.addEventListener('resize', updateLayout, false);
//  this.addEventListener('orientationchange', updateLayout, false);

}, false);
