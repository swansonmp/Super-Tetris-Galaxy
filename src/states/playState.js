import State from "./state.js";

export default class PlayState extends State {
  constructor(game) {
    super(game,
      [
        
      ]
    );

  }
  
  update(deltaTime) {
    this.game.graphics.update(deltaTime);
  }
  
  render() {
    this.game.graphics.render();
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleEscape() { this.game.setState(this.game.getPauseState()); }
  
}