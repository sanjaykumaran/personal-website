import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// LIGHTS

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );

//

const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add a cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

cube.castShadow = true;
scene.add(cube);

camera.position.z = 5;




// add a light
const light = new THREE.PointLight(0xffffff, 10, 50);
light.position.set(0, 10, 0);
// scene.add(light); 

// make more lights to illuminate the scene
const light2 = new THREE.PointLight(0xffffff, 0.8, 10000);
light2.position.set(10, 10, 0);
scene.add(light2);
light2.castShadow = true;

// make more lights to illuminate the scene

const light3 = new THREE.PointLight(0xffffff, 100, 100);
light3.position.set(0, 0, 10);
// scene.add(light3);

// renderer.shadowMap.enabled = true;

// add an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 10.5);
ambientLight.position.set(0, 4, 0);


// set the shadow properties of the light
// light.shadow.mapSize.width = 2512;
// light.shadow.mapSize.height = 2512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;

// make the shadow grey
renderer.shadowMap.type = THREE.BasicShadowMap;

THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

// scene.add(ambientLight);

// there is no shadow
// scene.background = new THREE.Color(0x000000);

renderer.shadowMap.enabled = true;

// add a helper to see the light
// scene.add(new THREE.CameraHelper(light.shadow.camera))
// scene.add(new THREE.CameraHelper(ambientLight.shadow.camera))


const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
groundMat.color.setHSL( 0.095, 1, 0.75 );

const ground = new THREE.Mesh( groundGeo, groundMat );
ground.position.y = - 33;
ground.rotation.x = - Math.PI / 2;
ground.receiveShadow = true;
scene.add( ground );


// change sky color not working using THREE.sky
renderer.setClearColor( 0xffffff, 0);

scene.background = new THREE.Color(0xffffff);

// import an stl model named "model"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
// use the stl loader
const loader = new STLLoader();
// load the stl model
loader.load("david-head.stl", function (geometry) {
  // create a material
  const material2 = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    specular: 0x111111, 
    shininess: 200
    
  });


  // create a mesh
  const headmesh = new THREE.Mesh(geometry, material2);
  // add the mesh to the scene
  scene.add(headmesh);
  // make the mesh smaller
  headmesh.scale.x = 0.01;
  headmesh.scale.y = 0.01;
  headmesh.scale.z = 0.01;
  // put the mesh on the ground
  headmesh.position.y = -1;
  // make the mesh cast shadow
  headmesh.castShadow = true;

});
  // make the mesh white
  // headmesh.material.color.setRGB(1, 1, 1);

  function addShadowedLight( x, y, z, color, intensity ) {

				const directionalLight = new THREE.DirectionalLight( color, intensity );
				directionalLight.position.set( x, y, z );
				scene.add( directionalLight );

				directionalLight.castShadow = true;

				const d = 1;
				directionalLight.shadow.camera.left = - d;
				directionalLight.shadow.camera.right = d;
				directionalLight.shadow.camera.top = d;
				directionalLight.shadow.camera.bottom = - d;

				directionalLight.shadow.camera.near = 1;
				directionalLight.shadow.camera.far = 4;

				directionalLight.shadow.bias = - 0.002;


};


scene.remove(cube);


function animate() {
  requestAnimationFrame(animate);

  scene.background = null;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// make it response to window resize
window.addEventListener("resize", function () {
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



function render() {

  const delta = clock.getDelta();

  for ( let i = 0; i < mixers.length; i ++ ) {

    mixers[ i ].update( delta );

  }

  renderer.render( scene, camera );

}

// use orbit controls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
