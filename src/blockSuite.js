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
		return this.blockFactory.createBlock(blockType.JBlock);
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
		this.positioning = [[],[]]; 
		let gravity = direction.SpinRight;
		switch (type) {
			case blockType.OBlock:
				//Block shape can be generated through offsets
				this.positioning[0] = [0.5, 0.5];
				this.positioning[1] = [[-0.5,-0.5],[0.5,0.5],[-0.5,0.5],[0.5,-0.5]];
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
				break;
			case blockType.EBlock:
				this.generateOffsets([
					[1,1,1],
					[1,0,0],
					[1,1,1],
					[1,0,0],
					[1,1,1]
				]);
				break;
			default:
		}
		this.positioning[0][0] += 23;
		this.positioning[0][1] += 8;
		console.log("giving block " + this.positioning[0]);
		console.log(this.positioning[1]);
		return new Block(4, this.positioning, gravity);
	}

	/*
	 * Takes a double array and generates the cell offsets
	 * cell offset + base block coordinates = its actual position on the grid
	 */
	generateOffsets(arr) {
		let cells = [];

		
		let offset = 0.5;
		let size = Math.max(arr.length, arr[0].length);

		//If a block is of even size, the origin exists between blocks
		if (size % 2 == 0) {
			this.positioning[0] = [0.5, 0.5];
		}
		else {
			this.positioning[0] = [0, 0];
		}
		
		for (let row = 0; row < arr.length; row++) {
		  	for (let col = 0; col < arr[row].length; col++) {
			  	if (arr[row][col] != 0) {
				  	cells.push(
				  		[col - size / 2 + offset, size / 2 - row - offset]
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
			this.cells.push(new Cell(positioning[1][i]));
		}

		this.gravity = gravity;

		this.active = true; //Might be useless
	}

	/* 
	 * Moves the block in the direction of gravity
	 * If the block encounters a collision, it dumps and returns true
	 */
	advance() {
		if (this.move(this.gravity)) {
			this.dump();
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
			if (this.cells[i].checkTransf(dir, this.x, this.y))
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
			return this.rotate(dir);
		if (this.checkTransf(dir))
			return true;
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i].move(dir);
		}
		return false;
	}

	/*
	 * rotate depending on the move specified
	 * This has its own method to leave room for modern tetris behavior,
	 * where the block is hoisted upon an unsuccessful rotation
	 */
	rotate(dir) {
		if (this.checkTransf(dir))
			return true;
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i].move(dir);
		}
		return false;
	}

	/* 
	 * Returns coordinates of all cells in the block for use in drawing
	 */
	getSet() {
		let set = [];

		this.cells.forEach(cell => {
			set.push([cell.x + this.x, cell.y + this.y])	
		});
		/*
		for (let i = 0; i < this.cells.length; i++) {
			set[i] = [this.cells[i].x + this.x, this.cells[i].y + this.y];
			console.log(this.cells[i].x + " " + this.y);
		}
		return set; */
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
		this.cells.forEach(cell => {
			window.grid[cell.x + this.x][cell.y + this.y] = this.type;
		});
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
		if (dir != direction.SpinRight && dir != direction.SpinLeft)
			return [direction.MoveAugments[dir][0] + this.x, 
					direction.MoveAugments[dir][1] + this.y];
		else
			return this.rotationMatrix(dir);
	}

	/*
	 * Check Transformation
	 * Ensures this particular cell can enter a space without collision
	 */
	checkTransf(dir, baseX, baseY) {
		let tc = this.transfCoords(dir);
		//console.log(this.x + " " + this.y + " " + tc[0] + " " + tc[1]);
		return (window.grid[tc[0] + baseX][tc[1] + baseY] != 0);
	}

	//Moves the cell in a direction
	move(dir) {
		let tc = this.transfCoords(dir);
		this.x = tc[0];
		this.y = tc[1];
	}

	/*
	 * Returns a 2 length array of the coordinates after the rotation specified.
	 */
	rotationMatrix(dir) {
		return [Math.round((this.x * Math.cos(dir) - this.y * Math.sin(dir)) * 10) / 10,
				Math.round((this.x * Math.sin(dir) + this.y * Math.cos(dir)) * 10) / 10 ];
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
	Pentimino	: 9,
	EBlock		: 10
}

const pi = Math.PI;

const direction = {
	Up : 0,
	Down: 1,
	Left: 2,
	Right: 3,
	SpinLeft : -pi / 2,
	SpinRight: pi / 2,
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