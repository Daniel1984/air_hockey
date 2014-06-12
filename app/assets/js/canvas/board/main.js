(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Board() {
    var texture = PIXI.Texture.fromImage("app/assets/img/raw/board_01.png");
    PIXI.TilingSprite.call(this, texture);
    this.width = texture.width;
    this.height = texture.height;
    this.updateLayout();
  }

  Board.prototype = Object.create(PIXI.Sprite.prototype);
  Board.prototype.constructor = Board;

  Board.prototype.updateLayout = function() {
    var scale = AH.getHeight() / this.height; 
    this.scale.y = scale;
    this.scale.x = scale;
    this.position.x = AH.getWidth() / 2 - this.width / 2;
  };

  Board.prototype.update = function() { };

  module.exports = Board;

})();
