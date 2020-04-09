import Input from "./input.js";
import Graphics from "./graphics.js";
import UIHelper from "./uiHelper.js";

export default class Game {
  constructor(renderer) {
    this.input = new Input(this);
    this.uiHelper = new UIHelper();
    this.graphics = new Graphics(this, renderer);
    
    
  }
  
  update(deltaTime) { 
    //this.state.update(deltaTime); 
  }
  render() { 
    //this.state.render();
  }
  
}