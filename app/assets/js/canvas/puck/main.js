(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Puck(options) {
    this.options = options; 
    var puckTextures = [
      PIXI.Texture.fromFrame('app/assets/img/raw/puck_black.png'),
      PIXI.Texture.fromFrame('app/assets/img/raw/puck_black_glow.png')];
    PIXI.MovieClip.call(this, puckTextures);
    this.gotoAndStop(1);
    this.repositionEl();
  }

  Puck.prototype = Object.create(PIXI.MovieClip.prototype);
  Puck.prototype.constructor = Puck;

  Puck.prototype.repositionEl = function() {
    var scale = AH.getScale();
    this.scale.x = this.scale.y = scale;
    this.anchor.x = this.anchor.y = 0.5;
    this.position.x = AH.getWidth() / 2;
    this.position.y = AH.getHeight() / 2;
  };

  Puck.prototype.glowOn = function() {
    this.gotoAndStop(1);
  };

  Puck.prototype.glowOff = function() {
    this.gotoAndStop(0);
  };

  module.exports = Puck;

})();
