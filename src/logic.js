export default class Logic {
	

  constructor(game) {
    this.game = game;
    
    this.gridSize = 49;
	  this.initGrid();
  }
  
  initGrid() {
    // temporary grid creation
    // init all to center block
    this.grid = [];
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i * this.gridSize + j] = 1;
      }
    }
  }
  
  getGrid() {
    return this.grid;
  }
  
  getGridSize() {
    return this.gridSize;
  }
  
}