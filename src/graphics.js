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
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1)); // Add light
  }
  
  initCamera() {
    let ratio = 10;
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth/-ratio, 
      window.innerWidth/ratio, 
      window.innerHeight/ratio, 
      window.innerHeight/-ratio, 
      0, 
      5000
    );
    this.camera.position.set(0, 100, 0);
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