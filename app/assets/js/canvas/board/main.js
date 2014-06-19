(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Board() {
    var texture = PIXI.Texture.fromImage("app/assets/img/raw/board_01.png");
    PIXI.TilingSprite.call(this, texture);
    this.updateLayout();
  }

  Board.prototype = Object.create(PIXI.Sprite.prototype);
  Board.prototype.constructor = Board;

  Board.prototype.updateLayout = function() {
    this.scale.y = this.scale.x = AH.getScale();
    this.position.x = AH.getWidth() / 2 - this.width / 2;
  };

  module.exports = Board;

})();
