export default class InputHandler {
    constructor(game) {
        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 13:
                    game.state.handleEnter();
                    break;
                case 27:
                    game.state.handleEscape();
                    break;
                case 32:
                    game.state.handleSpace();
                    break;
                case 37:
                    game.state.handleLeftArrow();
                    break;
                case 38:
                    game.state.handleUpArrow();
                    break;
                case 39:
                    game.state.handleRightArrow();
                    break;
                case 40:
                    game.state.handleDownArrow();
                    break;
                case 65:
                    game.state.handleAKey();
                    break;
                case 68:
                    game.state.handleDKey();
                    break;
                case 83:
                    game.state.handleSKey();
                    break;
                case 87:
                    game.state.handleWKey();
                    break;
                case 88:
                    game.state.handleXKey();
                    break;
                case 90:
                    game.state.handleZKey();
                    break;
                case 187:
                    game.state.handleEqualKey();
                    break;
                case 189:
                    game.state.handleMinusKey();
                    break;
                default:
            }
        });
        
        window.addEventListener(
            "resize",
            resize => {
                game.onWindowResize();
            },
            false
        );
        
    }
}
