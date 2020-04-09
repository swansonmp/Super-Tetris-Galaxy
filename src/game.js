import Input from "./input.js";
import Graphics from "./graphics.js";
import UIHelper from "./uiHelper.js";

import MenuState from "./states/menuState.js";
import PlayState from "./states/playState.js";

export default class Game {
  constructor(renderer) {
    this.input = new Input(this);
    this.uiHelper = new UIHelper();
    this.graphics = new Graphics(this, renderer);
    
    this.menuState = new MenuState(this);
    this.playState = new PlayState(this);
    
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
  getPlayState() { return this.playState; }
  
  onWindowResize() { this.graphics.onWindowResize(); }
  
}