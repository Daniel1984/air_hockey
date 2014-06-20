(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Handle(options) {
    this.options = options || {}; 
    PIXI.MovieClip.call(this, this.getTextures());
    this.puck = this.options.puck;
    this.repositionEl();
    this.setupInteraction();
    this.active = false;
    this.touch_start_x = null;
    this.touch_start_y = null;
    this.tousch_start_time = null;
    this.touch_end_time = null;
    this.radius = this.width / 2 - 6; // -6 is to bring objects closer as sprite considers glow
    this.puckRadius = this.puck.width / 2 - 6;
  }

  Handle.prototype = Object.create(PIXI.MovieClip.prototype);
  Handle.prototype.constructor = Handle;

  Handle.prototype.getTextures = function() {
    var textures = [
      PIXI.Texture.fromFrame('app/assets/img/raw/' + (this.options.handle_name || 'handle_blue') + '.png'),
      PIXI.Texture.fromFrame('app/assets/img/raw/' + (this.options.glow_handle_name || 'handle_blue_glow') + '.png') 
    ];
    return textures;
  };

  Handle.prototype.repositionEl = function() {
    this.scale.x = this.scale.y = AH.getScale();
    this.anchor.x = this.anchor.y = 0.5;
    this.position.x = AH.getWidth() / 2;
    this.position.y = this.options.handle_type === 'enemy' ? this.height : AH.getHeight() - this.height;
  };

//speed = distance / time
//acceleration = speed / time

  Handle.prototype.setupInteraction = function() {
    if(this.options.handle_type !== 'enemy') {
      this.setInteractive(true);
      this.mousedown = this.touchstart = this.onTouchStart;
      this.mousemove = this.touchmove = this.onTouchMove;
      this.mouseup = this.touchend = this.onTouchEnd;
    }
  };

  Handle.prototype.onTouchStart = function(e) {
    this.glowOn();
    this.active = true;
    this.touch_start_x = e.global.x;
    this.touch_start_y = e.global.y;
    this.touch_start_time = Date.now();
  };

  Handle.prototype.onTouchMove = function(e) {
    if(!this.active) return;
    this.restrictMovement(e);
    this.detectPuckCollision();
  };

  Handle.prototype.restrictMovement = function(e) {
    var x = e.global.x;
    var y = e.global.y; 
    if(x > AH.glpb() + this.width / 2 && x < AH.grpb() - this.width / 2) {
      this.position.x = e.global.x; 
    }
    if(y > AH.gtpb() + this.height / 2 && y < AH.gbpb() - this.height / 2) {
      this.position.y = e.global.y;
    }
  };

  Handle.prototype.detectPuckCollision = function() {
    var pp = this.puck.position;
    var tp = this.position;
    var d = Math.sqrt(((tp.x - pp.x) * (tp.x - pp.x)) + ((tp.y - pp.y) * (tp.y - pp.y)));
    if (d < (this.radius + this.puckRadius)) {
      console.log('ssssssssssssssssssssssssssss');
    }
  };

  Handle.prototype.onTouchEnd = function() {
    this.glowOff();
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
