import State from "./state.js";

import GreenFieldTheme from './../themes/GreenFieldTheme/greenFieldTheme.js';

export default class PlayState extends State {
    constructor(game) {
        super(game,
            [
                
            ]
        );

    }
    
    update(deltaTime) {
        this.game.graphics.update(deltaTime);
        this.game.logic.update(deltaTime);
    }
    
    render() {
        this.game.graphics.render();
    }
    
    /*
     * This is where the theme is instantiated.
     * TODO : get the theme from an options menu
     */
    start() {
        let theme = new GreenFieldTheme();
        this.game.graphics.addTheme(theme);
        
        this.showElements();
    }
    stop() { this.hideElements(); }
  
    handleEscape() { this.game.setState(this.game.getPauseState()); }
    handleLeftArrow() { this.game.logic.moveLeft(); }
    handleUpArrow() { this.game.logic.moveUp(); }
    handleRightArrow() { this.game.logic.moveRight(); }
    handleDownArrow() { this.game.logic.moveDown(); }
    handleXKey() { this.game.logic.spinRight(); }
    handleZKey() { this.game.logic.spinLeft(); }
    
}
