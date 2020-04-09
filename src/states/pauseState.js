import State from "./state.js";


export default class PauseState extends State {
	
	constructor(game) {
		super(game, 
		[
			{ id : "background3" }
		]
		);
	}
	
	update(deltaTime) {
		
	}
	
	render() {
	
	}
	
	start() {
		this.showElements();
	}
	
	stop() {
		this.hideElements();
	}
	
	handleEscape() {
		this.game.setState(this.game.getPauseState());
		console.log('working');
	}
	
}