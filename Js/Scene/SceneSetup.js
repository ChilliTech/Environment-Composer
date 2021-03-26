// ***************
// This file sets up the THREE.js scene
// ***************

// Keep track of whether an element with the id of "input" is being focused on
let focusing = false;

function is_focused(){
    for (let i = 0; i < document.getElementsByTagName("input").length; i++){
        let inputField = document.getElementsByTagName("input")[i];
        
        inputField.addEventListener("focus", function(){ focusing = true });
        inputField.addEventListener("focusout", function(){ focusing = false });
    }
}

is_focused();

// Setup the html elements & stuff
let resetProjectPrompt = "Are you sure you want to reset the whole project (it will clear everything you have saved - unless you have downloaded a backup)?";
let backupFileNamePrompt = "Please enter a name for your downloaded backup file:";
let canvas = document.getElementById("mainCanvas");
let header = document.getElementById("mainHeader");
let sceneTree = document.getElementById("sceneTree");

// Setup the three.js scene
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f8f8);
scene.name = "MyFirstProject";

// The camera
let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
camera.position.z = 10;
camera.lookAt(0, 0, 0);

// The renderer
let renderer = new THREE.WebGLRenderer(
    {
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true,
        canvas: canvas
    }
);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.gammaFactor = 0.2;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights;
camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
camera.updateProjectionMatrix();
renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
document.body.appendChild(renderer.domElement);

// The orbit controls
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// The directional light & helper
let directionalLight = new THREE.DirectionalLight(0xcccccc);
directionalLight.position.set(1.5, 2, 6);
directionalLight.name = "Directional Light";
scene.add(directionalLight);

let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 0x888888);
directionalLightHelper.name = "Directional Light Helper";
directionalLight.add(directionalLightHelper);

// The ambient light
let ambientLight = new THREE.AmbientLight(scene.background, 0.15);
ambientLight.name = "Ambient Light";
scene.add(ambientLight);

// The grid floor
let gridFloor = new THREE.GridHelper(12, 12, 0x888888, 0x888888);
gridFloor.name = "Grid Floor";
scene.add(gridFloor);

// Miscellaneous
let selectedObject = scene;
let selectedObjectBBox = new THREE.BoxHelper(selectedObject, 0xffff00);
selectedObjectBBox.name = "Selected Object Bounding Box";
scene.add(selectedObjectBBox);
