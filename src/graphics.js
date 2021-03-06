import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';

export default class Graphics {
    
    constructor(game, renderer) {
        this.game = game;
        this.renderer = renderer;
        
        this.dynamicThemes = true;
        
        this.initScene();
        this.initBlocks();
        this.initCamera();
        this.initControls();
    }
    
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.HemisphereLight( 0xffffff, 0x808080, 1 ));
    }
    
    addTheme(theme) {
        this.theme = theme;
        let graphicsScene = this.scene;
        let themeScene = theme.scene;
        
        // Apply background and fog
        graphicsScene.background = themeScene.background;
        graphicsScene.fog = themeScene.fog;
        
        // Add theme objects
        themeScene.traverse(function(element) {
            graphicsScene.add(element);
        });
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
        
        /*
        for (let i = 0; i < 9; i++) {
            this.materials[i].wireframe = true;
        }
        */
        
        let gridSize = this.game.logic.getGridSize();
        this.grid = this.game.logic.init2dArray(gridSize);
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let cube = new THREE.Mesh(this.geometry, this.materials[0]);
                cube.position.x = i;
                cube.position.y = -j;
                this.grid[i][j] = cube;
                this.scene.add(cube);
            }
        }
    }
    
    initCamera() {
        let ratio = 10;
        let gridSize = this.game.logic.getGridSize();
        this.camera = new THREE.PerspectiveCamera(
            75, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            0.1, // clipping distances
            1000
        );
        
        this.center = new THREE.Vector3(gridSize / 2 - 0.5, -gridSize / 2 + 0.5, 0);
        this.cameraDistance = 35;
        
        this.camera.position.x = this.center.x;
        this.camera.position.y = this.center.y;
        this.camera.position.z = this.cameraDistance;
        // this.camera.lookAt(gridSize / 2, gridSize / 2, gridSize);
    }
    
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        let gridSize = this.game.logic.getGridSize();
        this.controls.target = this.center.clone();
    }
    
    updateBlocks() {
        let logicGrid = this.game.logic.getGrid();
        let gridSize = this.game.logic.getGridSize();
        
        // Set graphics grid materials to match logic grid
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                let type = logicGrid[i][j];
                this.grid[i][j].material = this.materials[type];
            }
        }
        
        // Display active set
        let activeBlock = this.game.logic.getActiveBlock();
        let set = activeBlock.getSet();
        for (let i = 0; i < set.length; i++) {
            let x = set[i][0];
            let y = set[i][1];
            // Ensure drawing bounds
            if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
                this.grid[x][y].material = this.materials[activeBlock.getType()];
            }
        }
    }
    
    update(deltaTime) {
        if (this.dynamicThemes && this.theme != undefined) this.theme.update(deltaTime);
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
