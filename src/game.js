import Input from "./input.js";
import Graphics from "./graphics.js";
import UIHelper from "./uiHelper.js";
import Logic from "./logic.js";

import MenuState from "./states/menuState.js";
import PlayState from "./states/playState.js";
import PauseState from "./states/pauseState.js";

export default class Game {
  constructor(renderer) {
    this.input = new Input(this);
    this.uiHelper = new UIHelper();
    this.graphics = new Graphics(this, renderer);
    this.logic = new Logic(this);
    
    this.menuState = new MenuState(this);
    this.playState = new PlayState(this); 
    this.pauseState = new PauseState(this); 
    
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
  getPauseState() { return this.pauseState; }
  
  onWindowResize() { this.graphics.onWindowResize(); }
  
}