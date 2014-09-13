(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Puck(options) {
    this.options = options; 
    PIXI.MovieClip.call(this, this.getTextures());
    this.friction = 0.02;
    this.repositionEl();
    this.radius = this.width / 2;
    this.velocityy = 0;
    this.velocityx = 0;
  }

  Puck.prototype = Object.create(PIXI.MovieClip.prototype);
  Puck.prototype.constructor = Puck;

  Puck.prototype.getTextures = function() {
    return [
      PIXI.Texture.fromFrame('app/assets/img/raw/puck_black_glow.png'),
      PIXI.Texture.fromFrame('app/assets/img/raw/puck_black.png') 
    ];
  };

  Puck.prototype.repositionEl = function() {
    var scale = AH.getScale();
    this.scale.x = this.scale.y = scale;
    this.anchor.x = this.anchor.y = 0.5;
    this.position.x = AH.getWidth() / 2;
    this.position.y = AH.getHeight() / 2;
  };

  Puck.prototype.applySpeed = function(speed, angle) {
    this.velocityx = Math.cos(angle) * speed;
    this.velocityy = Math.sin(angle) * speed;
  };

  Puck.prototype.update = function() {
    console.log('X - ', this.position.x);
    console.log('Y - ', this.position.y);
    this.updatePosition();
    this.testWalls();
  };

  Puck.prototype.updatePosition = function() {
    this.velocityx = this.velocityx - this.velocityx * this.friction;
    this.velocityy = this.velocityy - this.velocityy * this.friction; 
    this.position.x = this.position.x += this.velocityx;
    this.position.y = this.position.y += this.velocityy;
  }; 

  Puck.prototype.testWalls = function() {
    if(this.position.x + this.radius > AH.grpb()) {
      this.velocityx = this.velocityx * -1;
      this.position.x = AH.grpb() - this.radius;                 
    } else if(this.position.x - this.radius < AH.glpb()) {
      this.velocityx = this.velocityx * -1;
      this.position.x = AH.glpb() + this.radius;
    } else if(this.position.y + this.radius > AH.gbpb()) {
      this.velocityy = this.velocityy * -1;
      this.position.y = AH.gbpb() - this.radius;
    } else if(this.position.y - this.radius < AH.gtb()) {
      this.velocityy = this.velocityy * -1;
      this.position.y = AH.gtb() + this.radius;
    }
  };

  Puck.prototype.glowOn = function() {
    this.gotoAndStop(1);
  };

  Puck.prototype.glowOff = function() {
    this.gotoAndStop(0);
  };

  module.exports = Puck;

})();
