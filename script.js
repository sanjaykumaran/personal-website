import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// make the cube a little bit bigger
cube.scale.x = 2;
cube.scale.y = 2;
cube.scale.z = 2;

// add a plane
const planeGeometry = new THREE.PlaneGeometry( 100, 100 );
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
// put the plane on the ground
// put it more down
plane.position.y = -10;
plane.rotation.x = Math.PI / 2;

// make a shadow from the cube on the plane
const light = new THREE.DirectionalLight( 0xffffff, 1 );


light.position.set( 0, 1, 1 ).normalize();
scene.add( light );
cube.castShadow = true;
plane.receiveShadow = true;








function animate() {
	requestAnimationFrame( animate );

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

// make it response to mouse move
document.addEventListener('mousemove', function(event) {
	camera.position.x = event.clientX / window.innerWidth * 10 - 5;
	camera.position.y = event.clientY / window.innerHeight * 10 - 5;
	camera.lookAt(scene.position);
});

