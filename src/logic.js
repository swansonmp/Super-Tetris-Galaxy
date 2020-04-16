import bagFactory from "./blockSuite.js";

export default class Logic {

  constructor(game) {
    this.game = game;
    
    this.gridSize = 49;
	  this.initGrid();
    this.initGame();
    
    this.elapsedTime = 1;
    this.delay = 1;
  }
    
  initGrid() {
    // Initialize grid
    window.grid = this.init2dArray(this.gridSize);
    
    // Set every cell as Air block
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        window.grid[i][j] = 0;  // 0: Air block type
      }
    }
    
    // Set Center Block
    let half = Math.trunc(this.gridSize / 2);
    window.grid[half][half] = 1;  // 1: Center block type
  }
  
  initGame() {
    this.bag = bagFactory(0);
    this.activeBlock = this.bag.pull();
  }
  
  update(deltaTime) {
    this.elapsedTime += deltaTime;
    if (this.elapsedTime >= this.delay) {
      console.log("tick");
      this.updateLogic();
      this.game.graphics.updateBlocks();
      this.elapsedTime -= this.delay;
    }
  }
  
  updateLogic() {
    /*
    if (this.activeBlock.advance()) {
      this.bag.pull();
    }
    */
  }
  
  init2dArray(size) {
    let a = [];
    for (let i = 0; i < size; i++) {
        a.push([]);
    }
    return a;
  }
  
  getGrid() {
    return window.grid;
  }
  
  getGridSize() {
    return window.grid[0].length;
  }
  
  getActiveBlock() {
    return this.activeBlock;
  }
  
}