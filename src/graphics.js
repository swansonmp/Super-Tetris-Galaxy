import * as THREE from './lib/three.module.js';

export default class Graphics {
	
  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
    
    this.initScene();
    this.initCamera();
  }
  
  initScene() {
    this.scene = new THREE.Scene();
  }
  
  initCamera() {
    let ratio = 10;
    this.camera = new THREE.PerspectiveCamera(
      75, //field of view
      window.innerWidth / window.innerHeight, //aspect ratio
	  0.1, //clipping distances
	  1000);
    this.camera.position.z = 5;
  }
  
  update(deltaTime) {
    
  }
  
  render() {
    this.renderer.render(this.scene, this.camera);

	let geometry = new THREE.BoxGeometry( 1, 1, 1 );
	let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
	let cube = new THREE.Mesh( geometry, material );
	
	this.scene.add(cube);
	
	
  }
  
  onWindowResize() {
    if (this.camera != undefined) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  
}