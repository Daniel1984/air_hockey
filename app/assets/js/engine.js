(function() {
  'use strict';

  var PIXI = require('pixi.js');

  function Main() {
    PIXI.Stage.call(this, 0x000000, true);
    this.setupCanvas();
    this.initGameLoop();
  }

  Main.prototype = Object.create(PIXI.Stage.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.setupCanvas = function() {
    this.renderer = PIXI.autoDetectRenderer(AH.getWidth(), AH.getHeight());
    document.body.appendChild(this.renderer.view);
  };

  Main.prototype.initGameLoop = function() {
    requestAnimFrame(this.initGameLoop.bind(this));
    this.children.forEach(function(child) { child.update(); });
    this.renderer.render(this);
  };

  module.exports = Main;

})();
