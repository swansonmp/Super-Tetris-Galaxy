export default class Logic {
  constructor(game) {
    this.game = game;
    
    this.initGrid();
  }
  
  initGrid() {
    this.grid = [];
  }
  
  getGrid() {
    return this.grid;
  }
  
}