/*
 * Simple factory, creates bags with different types of pools
 * depending on bagType specified
 */
export default function bagFactory(type) {
	switch (type) {
		case bagType.Classic:
			break;
		case bagType.Pentimino:
			break;
		case bagType.Unfair:
			break;
		default:
	}
	return new Bag();
}

class Bag {
	constructor() {
		this.blockFactory = new BlockFactory(0, 0, 0);
	}
	//I'm just a shell of a bag
	pull() {
		return this.blockFactory.createBlock(blockType.IBlock);
	}
}

class BlockFactory {
	/*
	 * gravStrat - How this particular block factory will assign gravity
	 * spawnStrat - How this particular block factory will assign spawns
	 */
	constructor(materialType, gravStrat, spawnStrat) {
		//The parameters for this are probably going to be reworked
		this.gravStrat = gravStrat;
		this.spawnStrat = spawnStrat;
	}

	createBlock(type) {
		//positioning: [[Base coordinates of the block], [Array of cell offsets]]
		this.positioning = [[0,0],[]]; 
		let gravity = 0;
		switch (type) {
			case blockType.OBlock:
				//Block shape can be generated through offsets
				this.positioning[0] = [0.5, 0.5];
				this.positioning[1] = [[0,0],[0,1],[1,0],[1,1]];
				break;
			case blockType.IBlock:
				//Or lazily with a drawn array
				this.generateOffsets([	
					[0,0,0,0],
					[1,1,1,1]
				]);
				break;
			case blockType.JBlock:
				this.generateOffsets([
					[1,0,0],
					[1,1,1]
				]); 
				break;
			case blockType.Pentimino:
				//maybe even randomly some day...
			default:
		}
		
		return new Block(type, this.positioning, gravity);
	}

	/*
	 * Takes a double array and generates the cell offsets
	 * cell offset + base block coordinates = its actual position on the grid
	 */
	generateOffsets(arr) {
		let cells = [];

		//If a block is of odd length, its axis is between blocks
		let offset = (Math.max(arr.length, arr[0].length) / 2) % 1;
		this.positioning[0] = [offset, offset];

		for (let row = 0; row < arr.length; row++) {
		  	for (let col = 0; col < arr[row].length; col++) {
			  	if (arr[row][col] != 0) {
				  	cells.push(
				  		[col - arr[row].length / 2 + offset, row - arr.length / 2 + offset]
				  	)
			  	}
		  	}
	  	}
	  	this.positioning[1] = cells;
	  	//still more to do here
	}

	/*
	 * Calculates spawn, returns coordinates
	 */
	spawn() {
		//dummy value
		return [0,0];
	}

}

//A set of cells, the complete block
class Block {
	constructor(materialType, positioning, gravity) {
		//this constructor probably needs more
		this.type = materialType; //Only really used for appearance this deep, an RGB value might be better
		this.x = positioning[0][0];
		this.y = positioning[0][1];

		this.cells = [];
		for (let i = 0; i < positioning[1].length; i++)	{
			this.cells[i] = new Cell(positioning[1][i]);
		}

		this.gravity = gravity;

		this.active = true; //Might be useless
	}

	/* 
	 * Moves the block in the direction of gravity
	 * If the block encounters a collision, it dumps and returns true
	 */
	advance() {
		if (move(this.gravity)) {
			dump();
			return true;
		}
		return false;
	}

	/*
	 * Check Transformation
	 * Ensures that the block can enter a certain space without a collision
	 * Takes direction enum
	 */
	checkTransf(dir) {
		for (let i = 0; i < this.cells.length; i++) {
			if (this.cells[i].checkTransf(dir))
				return true;
		}
		return false;
	}

	/*
	 * Moves all the cells of the block in a direction
	 * Rotation, while having its own function, is wrapped here
	 * for simplified enumeration access
	 *
	 * Returns whether the operation was successful.
	 * Rotations return because gravity might go CRAZY!
	 */
	move(dir) {
		if (dir == direction.SpinLeft || dir == direction.SpinRight)
			return rotate(dir);
		if (checkTransf(dir))
			return true;
		for (let i = 0; i < cells.length; i++) {
			this.cells[i].move(direction);
		}
		return false;
	}

	/*
	 * rotate depending on the move specified
	 * This has its own method to leave room for modern tetris behavior,
	 * where the block is hoisted upon an unsuccessful rotation
	 */
	rotate(dir) {
		if (checkTransf(dir))
			return true;
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i].move(direction.dir);
		}
		return false;
	}

	/* 
	 * Returns coordinates of all cells in the block for use in drawing
	 */
	getSet() {
		let set = [];
		for (let i = 0; i < this.cells.length; i++) {
			set[i] = [this.cells[i].x + this.x, this.cells[i].y + this.y];
		}
		return set;
	}

	/*
	 * Get type, for use in drawing
	 */
	 getType() {return this.type;}

	/*
	 * The pieces of the block are added to the solidified grid.
	 * The block is no longer considered active.
	 */
	dump() {
		//Need to access grid.
		this.active = false;
	}

	/*
	 * If for some reason a crazy gamemode involves changing the gravity of
	 * a falling block...
	 * It can be done here.
	 */
	setGravity(dir) {this.gravity = dir;}
}

//Individual squares of a block
class Cell {

	/*
	 * Cells use local coordinates that are offsets from the base block coordinate
	 */
	constructor(localCoords) {
		this.x = localCoords[0];
		this.y = localCoords[1];
	}

	/*
	 * Transformed Coordinates
	 * Generates a two length array, containing the local
	 * coordinates after a given transformation
	 */
	transfCoords(dir) {
		if (dir >= 0 && dir <= 3)
			return [direction.MoveAugments[dir] + this.x, 
					direction.MoveAugments[dir] + this.y];
		else
			return rotationMatrix(dir);
	}

	/*
	 * Check Transformation
	 * Ensures this particular cell can enter a space without collision
	 */
	checkTransf(dir, baseX, baseY) {
		let tc = transfCoords(dir);
		return (window.grid[tc[0]][tc[1]] != 0);
	}

	//Moves the cell in a direction
	move(dir) {
		let tc = transfCoords(dir);
		this.x = tc[0];
		this.y = tc[1];
	}

	/*
	 * Returns a 2 length array of the coordinates after the rotation specified.
	 */
	rotationMatrix(dir) {
		return [this.x * Math.cos(dir) + this.y * Math.sin(dir),
				this.x * -Math.sin(dir) + this.y * Math.cos(dir)];
	}
}

//Temporary duplicate enum
const blockType = {
	NoBlock     : 0,
	CenterBlock : 1,
	OBlock      : 2,
	IBlock      : 3,
	JBlock      : 4,
	LBlock      : 5,
	SBlock      : 6,
	ZBlock      : 7,
	TBlock      : 8,
	Pentimino	: 9
}

const direction = {
	Up : 0,
	Down: 1,
	Left: 2,
	Right: 3,
	SpinLeft : -90,
	SpinRight: 90,
	MoveAugments : [[0, 1], [0, 1], [-1, 0], [0, 1]]
}

//Mostly just examples of application at this point
const bagType = {
	Classic : 0,
	Pentimino : 1,
	Unfair: 2
}

/*
const gravStrats = {
	Classic: 0,
	Reverse: 1,
	//For co-op
	LockedUp: 2,
	LockedDown: 3,
	LockedLeft: 4,
	LockedRight: 5
} Probably scrap */