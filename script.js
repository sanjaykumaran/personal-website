import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

cube.castShadow = true;
scene.add( cube );

camera.position.z = 5;

// make the cube a little bit bigger
cube.scale.x = 2;
cube.scale.y = 2;
cube.scale.z = 2;



// add a plane
const planeGeometry = new THREE.PlaneGeometry( 100, 100 );
const planeMaterial = new THREE.MeshLambertMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );


plane.receiveShadow = true;

scene.add( plane );
// put the plane on the ground
// put it more down
plane.position.y = -10;
plane.rotation.x = Math.PI / 2;

// add a light
const light = new THREE.PointLight(0xffffff, 10, 50);
light.position.set(0, 10, 0);
// scene.add(light);

// make more lights to illuminate the scene
const light2 = new THREE.PointLight(0xffffff, 10, 200);
light2.position.set(10, 10, 0);
scene.add(light2);
light2.castShadow = true;

// make more lights to illuminate the scene

const light3 = new THREE.PointLight(0xffffff, 100, 100);
light3.position.set(0, 0, 10);
// scene.add(light3);


// renderer.shadowMap.enabled = true;


// add an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 100.5);
ambientLight.position.set(0, 4, 0);



// add a shadow camera
light.castShadow = true;
// ambientLight.castShadow = true;


// make the shadow softer
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// make the shadow grey
renderer.shadowMap.type = THREE.BasicShadowMap;



// set the shadow properties of the light
light.shadow.mapSize.width = 2512;
light.shadow.mapSize.height = 2512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;


// make the shadow grey
renderer.shadowMap.type = THREE.BasicShadowMap;
 



// scene.add(ambientLight);


// there is no shadow
// scene.background = new THREE.Color(0x000000);




renderer.shadowMap.enabled = true;


// add a helper to see the light
// scene.add(new THREE.CameraHelper(light.shadow.camera)) 
// scene.add(new THREE.CameraHelper(ambientLight.shadow.camera)) 

function animate() {
	requestAnimationFrame( animate );


	scene.background = null;

	

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();

// make it response to window resize
window.addEventListener('resize', function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

// // make it response to mouse move
// document.addEventListener('mousemove', function(event) {
// 	camera.position.x = event.clientX / window.innerWidth * 10 - 5;
// 	camera.position.y = event.clientY / window.innerHeight * 10 - 5;
// 	camera.lookAt(scene.position);
// });

// use orbit controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

