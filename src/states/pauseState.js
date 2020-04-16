import State from "./state.js";


export default class PauseState extends State {
	
	constructor(game) {
		super(game,
       [
        { id: "pauseFilter" },
        { id: "pauseText", text: "Paused"},
        { id: "optionButton", tag: "button", text: "Options" },
        { id: "exitButton", tag: "button", text: "Exit" }
       ]
	  );
    
    document.getElementById("optionButton").onclick = function() { }
    document.getElementById("exitButton").onclick = function() { game.setState(game.getMenuState()); }
	}
	
	update(deltaTime) {
		
	}
	
	render() {
    this.game.graphics.render();
	}
	
	start() {
		this.showElements();
	}
	
	stop() {
		this.hideElements();
	}
	
	handleEscape() {
		this.game.setState(this.game.getPlayState());
	}
	
}