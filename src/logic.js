import bagFactory from "./blockSuite.js";
import { direction } from "./blockSuite.js";

export default class Logic {

    constructor(game) {
        this.game = game;
        
        this.gridSize = 49;
        this.initGrid();
        this.initGame();
        
        this.elapsedTime = 1;
        this.delay = 1;
    }

    initGrid() {
        // Initialize grid
        window.grid = this.init2dArray(this.gridSize);
        
        // Set every cell as Air block
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                window.grid[i][j] = 0;  // 0: Air block type
            }
        }
        
        // Set Center Block
        let half = Math.trunc(this.gridSize / 2);
        window.grid[half][half] = 1;  // 1: Center block type
    }
    
    initGame() {
        this.bag = bagFactory(0);
        this.activeBlock = this.bag.pull();
    }
    
    update(deltaTime) {
        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= this.delay) {
            console.log("tick");
            this.advanceBlock();
            this.game.graphics.updateBlocks();
            this.elapsedTime -= this.delay;
        }
    }
    
    advanceBlock() {
        if (this.activeBlock.advance()) {
            this.breakCheck(this.activeBlock);
            this.activeBlock = this.bag.pull();
        }
    }
    
    breakCheck(block) {
        let rings = this.findRings(block)
        rings.forEach(this.testRing);
    }

    findRings(block) {
        let rings = [];
        block.getSet().forEach(coords => {
            rings.push(Math.max(Math.abs(this.origin(coords[0])), Math.abs(this.origin(coords[1]))));
        });

        return rings;
    }

    testRing(ring) {
        console.log(ring);
    }
    
    moveLeft() { this.move(direction.Left); }
    moveUp() { this.move(direction.Up); }
    moveRight() { this.move(direction.Right); }
    moveDown() { this.move(direction.Down); }
    spinLeft() { this.move(direction.SpinLeft); }
    spinRight() { this.move(direction.SpinRight); }
    
    move(dir) {
        this.activeBlock.move(dir);
        this.game.graphics.updateBlocks();
    }
    
    init2dArray(size) {
        let a = [];
        for (let i = 0; i < size; i++) {
            a.push([]);
        }
        return a;
    }
    
    getGrid() {
        return window.grid;
    }
    
    getGridSize() {
        return window.grid[0].length;
    }

    //Adjusts origin to middle of grid
    origin(coord) {
        return Math.round(coord - this.gridSize / 2);
    }
    
    getActiveBlock() {
        return this.activeBlock;
    }
    
}
