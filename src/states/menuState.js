import State from "./state.js";

export default class MenuState extends State {
	
  constructor(game) {
    super(game,
      [
        { id: "background" },
		{ id: "menuButton", tag: "Button", text: "PLAY" }
      ]
    );

    document.getElementById("menuButton").onclick = function() { game.setState(game.getPlayState()); }
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleEnter() { this.game.setState(this.game.getPlayState()); }
  
}