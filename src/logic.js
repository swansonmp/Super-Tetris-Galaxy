export default class Logic {
	

  constructor(game) {
    this.game = game;
    
    this.type = {
        NoBlock     : 0,
        CenterBlock : 1,
        OBlock      : 2,
        IBlock      : 3,
        JBlock      : 4,
        LBlock      : 5,
        SBlock      : 6,
        ZBlock      : 7,
        TBlock      : 8
	  }
    
    this.gridSize = 49;
	  this.initGrid();
    
    this.elapsedTime = 1;
    this.delay = 1;
  }
  
  initGrid() {
    this.grid = [];
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        //this.grid[i * this.gridSize + j] = (i * this.gridSize + j) % 9; // For pretty rainbow
        this.grid[i * this.gridSize + j] = this.type.NoBlock;
      }
    }
    
    // Set Center Block
    let half = Math.trunc(this.gridSize / 2);
    this.grid[half * this.gridSize + half] = this.type.CenterBlock;
  }
  
  update(deltaTime) {
    this.elapsedTime += deltaTime;
    if (this.elapsedTime >= this.delay) {
      this.game.graphics.updateBlocks();
      this.elapsedTime -= this.delay;
    }
  }
  
  getGrid() {
    return this.grid;
  }
  
  getGridSize() {
    return this.gridSize;
  }
  
}