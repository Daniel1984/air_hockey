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
    this.radius = this.width / 2 - 6; // -6 is to bring objects closer as sprite considers glow
    this.puckRadius = this.puck.width / 2 - 6;
    this.resetTstCount = 0;
  }

  Handle.prototype = Object.create(PIXI.MovieClip.prototype);
  Handle.prototype.constructor = Handle;

  Handle.prototype.getTextures = function() {
    return [
      PIXI.Texture.fromFrame('app/assets/img/raw/' + (this.options.handle_name || 'handle_blue') + '.png'),
      PIXI.Texture.fromFrame('app/assets/img/raw/' + (this.options.glow_handle_name || 'handle_blue_glow') + '.png') 
    ];
  };

  Handle.prototype.repositionEl = function() {
    this.scale.x = this.scale.y = AH.getScale();
    this.anchor.x = this.anchor.y = 0.5;
    this.position.x = AH.getWidth() / 2;
    this.position.y = this.options.handle_type === 'enemy' ? this.height : (AH.getHeight() - this.height);
  };

  Handle.prototype.setupInteraction = function() {
    if(this.options.handle_type === 'enemy') return;
    this.setInteractive(true);
    this.mousedown = this.touchstart = this.onTouchStart;
    this.mousemove = this.touchmove = this.onTouchMove;
    this.mouseup = this.touchend = this.onTouchEnd;
  };

  Handle.prototype.onTouchStart = function(e) {
    this.glowOn();
    this.active = true;
    // touch start x
    this.tsx = e.global.x;
    // touch start y
    this.tsy = e.global.y;
  };

  Handle.prototype.onTouchMove = function(e) {
    if(!this.active) return;
    this.restrictMovement(e);
    this.detectPuckCollision();
  };

  Handle.prototype.restrictMovement = function(e) {
    var x = e.global.x;
    var y = e.global.y; 
    if(x > AH.glpb() + this.width / 2 && x < AH.grpb() - this.width / 2) this.position.x = e.global.x;
    if(y > AH.gtpb() + this.height / 2 && y < AH.gbpb() - this.height / 2) this.position.y = e.global.y;
    if(x < AH.glpb()) this.position.x = AH.glpb() + this.width / 2;
    if(x > AH.grpb()) this.position.x = AH.grpb() - this.width / 2;
    if(y < AH.gtpb()) this.position.y = AH.gtpb() + this.height / 2;
    if(y > AH.gbpb()) this.position.y = AH.gbpb() - this.height / 2;
  };

  Handle.prototype.detectPuckCollision = function() {
    var ppy = this.puck.position.y;
    var ppx = this.puck.position.x;
    var tpy = this.position.y;
    var tpx = this.position.x;
    var tpxmppx = tpx - ppx;
    var tpymppy = tpy - ppy;
    var d = Math.sqrt(tpxmppx * tpxmppx + tpymppy * tpymppy);
    if (d <= this.radius + this.puckRadius) {
      var velocity = Math.sqrt((Math.pow((tpy-this.tsy), 2) + Math.pow((tpx-this.tsx), 2)));
      var angle = Math.atan((tpy-this.tsy)/(tpx-this.tsx));
      this.puck.applySpeed(velocity / 2, angle);
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
