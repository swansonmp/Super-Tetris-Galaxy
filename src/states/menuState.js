import State from "./state.js";

export default class MenuState extends State {
  constructor(game) {
    super(game,
      [
        { id: "background" },
<<<<<<< HEAD
	    { id: "menuText", text: "Super Tetris Galaxy(tm) Gamer Federation 2020. Press Enter"},
		{ id: "menuButton", tag: "Button", text: "CLICK ME" }
=======
>>>>>>> ab377074b501f3ce772490419ba17a72656ca894
      ]
    );

    document.getElementById("menuButton").onclick = function() { alert('working'); }
  }
  
  start() { this.showElements(); }
  stop() { this.hideElements(); }
  
  handleEnter() { this.game.setState(this.game.getPlayState()); }
  
}