export default class State {
    constructor(game, elementSpecs) {
        this.game = game;
        
        if (elementSpecs == undefined) {
        this.elementSpecs = [];
        }
        else {
        this.elementSpecs = elementSpecs;
        }
        let elements = [];
        this.elementSpecs.forEach(spec => {
            elements.push(game.uiHelper.createElement(spec));
        });
        this.elements = elements;
    }
    
    start() { }
    stop() { }
    update(deltaTime) { }
    render() { }
    
    showElements() {
        this.elements.forEach(element => {
            element.style.display = "block";
        });
    }
    
    hideElements() {
        this.elements.forEach(element => {
            element.style.display = "none";
        });
    }
    
    handleEnter() {}
    handleSpace() {}
    handleUp() {}
    handleDown() {}
    handleLeft() {}
    handleRight() {}
    handleEscape() {}
    handleWKey() {}
    handleAKey() {}
    handleSKey() {}
    handleDKey() {}
    handleXKey() {}
    handleZKey() {}
    handleEqual() {}
    handleMinus() {}
    
}
