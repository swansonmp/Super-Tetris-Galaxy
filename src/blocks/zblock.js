
export default class ZBlock {
	constructor(blockType, gridSize) {
		let z = blockType;
		
		this.states = 
		[ [[z, z, 0],
		   [0, z, z],  //z[0]
		   [0, 0, 0]],
		  [[0, 0, z],
		   [0, z, z], //z[1]
		   [0, z, 0]],
		  [[0, 0, 0],
		   [z, z, 0], //states[2]
		   [0, z, z]],
		  [[0, z, 0],
		   [z, z, 0], //states[3]
		   [z, 0, 0]]
	    ];
		
		this.x = Math.trunc(gridSize / 2); //spawnpoint for x
		this.y = 1;
		
		
		this.currentState = this.states[0];
		this.type = blockType;
	}
}
