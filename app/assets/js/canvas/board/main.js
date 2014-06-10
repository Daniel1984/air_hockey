(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Board() {
    var texture = PIXI.Texture.fromImage("app/assets/img/raw/board_01.png");
    PIXI.TilingSprite.call(this, texture);
    this.width = texture.width;
    this.height = texture.height;
    this.position.x = AH.getWidth() / 2 - this.width / 2;
    this.scaleToFitScreen();
    window.shait = this;
  }

  Board.prototype = Object.create(PIXI.Sprite.prototype);
  Board.prototype.constructor = Board;

  Board.prototype.scaleToFitScreen = function() {
    var scale = AH.getHeight() / this.height; 
    console.log(scale);
    this.scale.y = scale;
  };

  Board.prototype.update = function() { };

  module.exports = Board;

})();
