import * as THREE from './../../lib/three.module.js';
import Theme from './../theme.js';

export default class GreenFieldTheme extends Theme {
  constructor() {
    super();
    this.elapsedTime = 0;
    this.period = 1;
    this.movementSpeed = 0.25;
    
    // Blue background
    this.scene.background = new THREE.Color(0x87CEEB);
    // Add fog
    this.scene.fog = new THREE.Fog(0x87CEEB, 300, 500);
    
    // Green ground
    let geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);
    
    this.texture = new THREE.TextureLoader().load('./src/themes/GreenFieldTheme/grass.jpg');
    this.texture.wrapS = THREE.RepeatWrapping; 
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.offset = new THREE.Vector2(0, 0);
    this.texture.repeat.set(100, 100); 
    let material = new THREE.MeshLambertMaterial({ map: this.texture, side: THREE.DoubleSide });
    let plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);
    plane.position.set(0, -50, 0);
  }
  
  update(deltaTime) {
    this.texture.offset.add(new THREE.Vector2(0, this.movementSpeed).multiplyScalar(deltaTime)); 
    if (this.texture.offset <= 1) {
      this.texture.offset -= 1;
    }
  }
}
