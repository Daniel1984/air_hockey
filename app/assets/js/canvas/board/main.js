(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Board() {
    var texture = PIXI.Texture.fromImage("app/assets/img/raw/board_01.png");
    PIXI.TilingSprite.call(this, texture);
    this.width = AH.getWidth();
    this.height = AH.getHeight();
  }

  Board.prototype = Object.create(PIXI.Sprite.prototype);
  Board.prototype.constructor = Board;

  Board.prototype.scaleToFitScreen = function() {
//    if(FP.getHeight() > this.texture.height) {
//      this.scale.y = FP.getHeight() / this.texture.height;
//    }
  };

  Board.prototype.update = function() { };

  module.exports = Board;

})();
