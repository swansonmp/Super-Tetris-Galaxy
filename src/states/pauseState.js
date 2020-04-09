import State from "./state.js";


export default class PauseState extends State {
	
	constructor(game) {
		super(game,
      [
        { id: "pauseFilter" },
        { id: "pauseText", text: "Paused"}
      ]
    );
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