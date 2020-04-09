import Input from "./input.js";
import Graphics from "./graphics.js";
import UIHelper from "./uiHelper.js";

import MenuState from "./states/menuState.js";

export default class Game {
  constructor(renderer) {
    this.input = new Input(this);
    this.uiHelper = new UIHelper();
    this.graphics = new Graphics(this, renderer);
    
    this.menuState = new MenuState(this);
    
    this.state = this.getMenuState();
    this.state.start();
  }
  
  update(deltaTime) { 
    this.state.update(deltaTime); 
  }
  render() { 
    this.state.render();
  }
  
  setState(state) {
    this.state.stop();
    this.state = state;
    this.state.start();
  }
  
  getMenuState() { return this.menuState; }
  
  onWindowResize() { this.graphics.onWindowResize(); }
  
}