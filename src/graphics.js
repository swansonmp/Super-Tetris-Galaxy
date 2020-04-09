import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );

export default class Graphics {


  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
    
    this.initScene();
    this.initCamera();
    this.initControls();
  }
  
  initScene() {
    this.scene = new THREE.Scene();
	this.scene.add(cube);
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
  
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }
  
  update(deltaTime) {
    
  }
  
  render() {
    this.renderer.render(this.scene, this.camera);
	
  }
  
  onWindowResize() {
    if (this.camera != undefined) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
  
}