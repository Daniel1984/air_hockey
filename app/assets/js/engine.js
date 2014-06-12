(function() {
  'use strict';

  var PIXI = require('pixi.js'),
      AssetLoader = require('./asset_loader'),
      Board = require('./canvas/board/main'),
      BorderMc = require('./canvas/board_border/main');

  function Main() {
    PIXI.Stage.call(this, 0x000000, true); 
    this.setupCanvas();
    this.loadAssets();
  }

  Main.prototype = Object.create(PIXI.Stage.prototype);
  Main.prototype.constructor = Main;

  Main.prototype.setupCanvas = function() {
    this.renderer = PIXI.autoDetectRenderer(AH.getWidth(), AH.getHeight());
    document.body.appendChild(this.renderer.view); 
    this.canvas = document.getElementsByTagName('canvas')[0];
  };

  Main.prototype.loadAssets = function() {
    AssetLoader.onComplete = this.onDoneLoadingAssets.bind(this);
    AssetLoader.load();
  };
  
  Main.prototype.onDoneLoadingAssets = function() {
    this.board = new Board();
    this.leftBorder = new BorderMc({ position: 'left' });
    this.rightBorder = new BorderMc({ position: 'right' });
    this.addChild(this.board);
    this.addChild(this.leftBorder);
    this.addChild(this.rightBorder);
    this.initGameLoop();
  };

  Main.prototype.initGameLoop = function() {
    requestAnimFrame(this.initGameLoop.bind(this));
    this.children.forEach(function(child) {
      if(typeof child.update === 'function') child.update(); 
    });
    this.renderer.render(this);
  };

  Main.prototype.updateLayout = function() {
    this.canvas.width = AH.getWidth();
    this.canvas.height = AH.getHeight();
    this.children.forEach(function(child) {
      if(typeof child.updateLayout === 'function') child.updateLayout();
    });
  };

  module.exports = Main;

})();
