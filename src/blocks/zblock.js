
export default class ZBlock {
	constructor(blockType, direction, gridSize) {
		let z = blockType;
		
		this.states = 
		[ [[z, z, 0],
		   [0, z, z],  //states[0]
		   [0, 0, 0]],
		   
		  [[0, 0, z],
		   [0, z, z], //states[1]
		   [0, z, 0]],
		   
		  [[0, 0, 0],
		   [z, z, 0], //states[2]
		   [0, z, z]],
		   
		  [[0, z, 0],
		   [z, z, 0], //states[3]
		   [z, 0, 0]]
	    ];
		
		//this.x = Math.trunc(gridSize / 2); //spawnpoint for x
		this.x = 0;
		this.y = 0;
		
		console.log('d' + direction);
		this.currentState = this.states[0];
		this.type = blockType; 
		
		this.spawnXY(gridSize, direction);
		
		
	}
	
	//decide based off direction given, where to spawn the block.
	spawnXY(gridSize, direction) {
		let halfway = Math.trunc(gridSize / 2);
		
		switch (direction) {
			case 0: //up
				this.x = halfway;
				this.y = 0;
				break;
			case 1: //down
				this.x = halfway;
				this.y = gridSize - 2; //change later
				break;
			case 2: //left
				this.x = 0;
				this.y = halfway;
				break;
			case 3: //right
				this.x = gridSize - 3; //this keeps breaking it and i aint sure why.
				this.y = halfway;
				break;
		}
		
	}
	
}
