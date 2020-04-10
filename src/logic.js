import OBlock from "./blocks/oblock.js";
import ZBlock from "./blocks/zblock.js";

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
	  
	  //not sure where direction enum should go.
	  this.direction = {
		  Up : 0,
		  Down: 1,
		  Left: 2,
		  Right: 3
	  }
	
    this.gridSize = 49;
	  this.initGrid();
    
    this.elapsedTime = 1;
    this.delay = 1;
	
    //we know we need an active block and stuff      
	this.currentBlock = new ZBlock(this.type.ZBlock, this.direction.Up, this.gridSize); //constructor is just a placeholder for now.
	this.updateCurrentBlock(); 
  }
  
  //get the state matrix of the current block, then selectively decide which cells need to be filled in.
  updateCurrentBlock() {
	  let block = this.currentBlock.currentState; //states[] of the block
	  
	  for (let row = 0; row < block.length; row++) {
		  for (let col = 0; col < block.length; col++) {
			  if (block[row][col] != 0) {
				  this.stateMatrixToGrid(row, col);
			  }
		  }
	  }
  }
  
  //X and Y variables are the offset of the top-left corner of the matrix to the origin (0,0)
  stateMatrixToGrid(row, col) {
	  let x = this.currentBlock.x;
	  let y = this.currentBlock.y;
	  this.grid[x + col][y + row] = this.currentBlock.type;
  }
  
  initGrid() {
    this.grid = this.init2dArray(this.gridSize);
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        //this.grid[i][j] = (i * this.gridSize + j) % 9; // For pretty rainbow
        this.grid[i][j] = this.type.NoBlock;
      }
    }
    
    // Set Center Block
    let half = Math.trunc(this.gridSize / 2);
    this.grid[half][half] = this.type.CenterBlock;
  }
  
  update(deltaTime) {
    this.elapsedTime += deltaTime;
    if (this.elapsedTime >= this.delay) {
      this.game.graphics.updateBlocks();
      this.elapsedTime -= this.delay;
    }
  }
  
  init2dArray(size) {
    let a = [];
    for (let i = 0; i < size; i++) {
        a.push([]);
    }
    return a;
  }
  
  getGrid() {
    return this.grid;
  }
  
  getGridSize() {
    return this.gridSize;
  }
  
}