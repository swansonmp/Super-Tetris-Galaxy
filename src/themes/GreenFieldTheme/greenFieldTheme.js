import * as THREE from './../../lib/three.module.js';
import Theme from './../theme.js';

export default class GreenFieldTheme extends Theme {
  constructor() {
    super();
    
    // Blue background
    this.scene.background = new THREE.Color(0x87CEEB);
    // Add fog
    this.scene.fog = new THREE.Fog(0x87CEEB, 10, 500);
    
    // Green ground
    let geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    geometry.rotateX(-Math.PI / 2);
    
    let texture = new THREE.TextureLoader().load('./src/themes/GreenFieldTheme/grass.jpg');
    texture.wrapS = THREE.RepeatWrapping; 
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100); 
    let material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
    let plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);
    plane.position.set(0, -50, 0);
  }
}
