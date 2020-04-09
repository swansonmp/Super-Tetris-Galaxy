import * as THREE from './lib/three.module.js';
import Stats from './lib/stats.module.js';
import Game from "./game.js";

let stats, game;
let clock = new THREE.Clock();
let time = 0;

function init() {
  let container = document.getElementById('container');
  
  // Create renderer
	let renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);
  
  // Create Stats
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);
  
  // Create Game
  game = new Game(renderer);
}

function gameLoop() {
  let deltaTime = clock.getDelta();
  
  game.update(deltaTime);
	game.render();
  
  stats.update();
  
	time += deltaTime;
  requestAnimationFrame(gameLoop);
}

init();
requestAnimationFrame(gameLoop);