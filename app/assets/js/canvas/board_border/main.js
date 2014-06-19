(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Border(options) {
    this.options = options; 
    var borderTextures = [
      PIXI.Texture.fromFrame('app/assets/img/raw/border_blue.png'),
      PIXI.Texture.fromFrame('app/assets/img/raw/border_blue_glow.png')];
    PIXI.MovieClip.call(this, borderTextures);
    this.animationSpeed = 0.1;
    this.updateLayout();
    this.repositionEl();
  }

  Border.prototype = Object.create(PIXI.MovieClip.prototype);
  Border.prototype.constructor = Border;

  Border.prototype.updateLayout = function() {
    this.scale.y = this.scale.x = AH.getScale(); 
  };

  Border.prototype.repositionEl = function() {
    this.pivot.y = this.pivot.x = 0.5;
    this.rotation = this.options.position === 'right' ? Math.PI : 0;
    this.position.x = AH.getWidth() / 2 - (this.options.position === 'left' ? this.width : -this.width);
    this.position.y = this.options.position === 'right' ? AH.getHeight() : 0;
  };

  Border.prototype.play = function() {
    this.gotoAndPlay(0);
  };

  Border.prototype.stop = function() {
    this.gotoAndStop(0);
  };

  module.exports = Border;

})();
