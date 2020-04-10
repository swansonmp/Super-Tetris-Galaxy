import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';

export default class Graphics {


  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
    
    this.initScene();
    this.initBlocks();
    this.initCamera();
    this.initControls();
  }
  
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.HemisphereLight( 0xffffff, 0x808080, 1 ));
  }
  
  initBlocks() {
    this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    this.materials = [
      new THREE.MeshBasicMaterial( {transparent: true, opacity: 0} ),
      new THREE.MeshStandardMaterial( {color: 0xffffff} ),
      new THREE.MeshStandardMaterial( {color: 0xffff00} ),
      new THREE.MeshStandardMaterial( {color: 0x00ffff} ),
      new THREE.MeshStandardMaterial( {color: 0x0000ff} ),
      new THREE.MeshStandardMaterial( {color: 0xff8000} ),
      new THREE.MeshStandardMaterial( {color: 0x00ff00} ),
      new THREE.MeshStandardMaterial( {color: 0xff0000} ),
      new THREE.MeshStandardMaterial( {color: 0x8000ff} )
    ];
    //this.material.wireframe = true;
    
    this.grid = [];
    let gridSize = this.game.logic.getGridSize();
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let cube = new THREE.Mesh(this.geometry, this.materials[0]);
        cube.position.x = i;
        cube.position.y = -j;
        this.grid[i * gridSize + j] = cube;
        this.scene.add(cube);
      }
    }
  }
  
  initCamera() {
    let ratio = 10;
    let gridSize = this.game.logic.getGridSize();
    this.camera = new THREE.PerspectiveCamera(
      75, //field of view
      window.innerWidth / window.innerHeight, //aspect ratio
      0.1, //clipping distances
      100
    );
    
    this.camera.position.x = gridSize / 2;
    this.camera.position.y = -gridSize / 2;
    this.camera.position.z = 35;
    //this.camera.lookAt(gridSize / 2, gridSize / 2, gridSize);
  }
  
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    let gridSize = this.game.logic.getGridSize();
    this.controls.target = new THREE.Vector3(gridSize / 2, -gridSize / 2, 0);
    
  }
  
  update(deltaTime) {
    let logicGrid = this.game.logic.getGrid();
    let gridSize = this.game.logic.getGridSize();
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        let type = logicGrid[i * gridSize + j];
        this.grid[i * gridSize + j].material = this.materials[type];
      }
    }
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