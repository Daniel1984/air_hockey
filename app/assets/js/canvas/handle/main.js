(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Handle(options) {
    this.options = options || {}; 
    PIXI.MovieClip.call(this, this.getTextures());
    this.repositionEl();
    this.setupInteraction();
    this.active = false;
  }

  Handle.prototype = Object.create(PIXI.MovieClip.prototype);
  Handle.prototype.constructor = Handle;

  Handle.prototype.getTextures = function() {
    var textures = [
      PIXI.Texture.fromFrame('app/assets/img/raw/' + (this.options.glow_handle_name || 'handle_blue_glow') + '.png'),
      PIXI.Texture.fromFrame('app/assets/img/raw/' + (this.options.handle_name || 'handle_blue') + '.png')
    ];
    return textures;
  };

  Handle.prototype.setupInteraction = function() {
    if(this.options.handle_type !== 'enemy') {
      this.setInteractive(true);
      this.mousedown = this.touchstart = this.onTouchStart;
      this.mousemove = this.touchmove = this.onTouchMove;
      this.mouseup = this.touchend = this.onTouchEnd;
    }
  };

  Handle.prototype.repositionEl = function() {
    this.scale.x = this.scale.y = AH.getScale();
    this.anchor.x = this.anchor.y = 0.5;
    this.position.x = AH.getWidth() / 2;
    this.position.y = this.options.handle_type === 'enemy' ? this.height : AH.getHeight() - this.height;
  };

  Handle.prototype.onTouchStart = function() {
    this.active = true;
  };

  Handle.prototype.onTouchMove = function(e) {
    if(!this.active) return;
    var x = e.global.x;
    var y = e.global.y; 
    if(x > AH.glpb() + this.width / 2 && x < AH.grpb() - this.width / 2) {
      this.position.x = e.global.x; 
    }
    if(y > AH.gtpb() + this.height / 2 && y < AH.gbpb() - this.height / 2) {
      this.position.y = e.global.y;
    }
  };

  Handle.prototype.onTouchEnd = function() {
    this.active = false;
  };

  Handle.prototype.glowOn = function() {
    this.gotoAndStop(1);
  };

  Handle.prototype.glowOff = function() {
    this.gotoAndStop(0);
  };

  module.exports = Handle;

})();
