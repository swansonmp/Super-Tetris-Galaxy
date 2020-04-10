import State from "./state.js";

export default class MenuState extends State {
  constructor(game) {
    super(game,
      [
        { id: "background" },
	    { id: "menuText", text: "Super Tetris Galaxy(tm) Gamer Federation 2020. Press Enter"},
		{ id: "menuButton", tag: "Button", text: "CLICK ME" }
      ]
    );

    document.getElementById("menuButton").onclick = function() { alert('working'); }
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleEnter() { this.game.setState(this.game.getPlayState()); }
  
}