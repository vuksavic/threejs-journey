import * as THREE from 'three'

console.log(THREE);

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');

const axesHelper = new THREE.AxesHelper(2);

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = 0;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;

group.add(cube1);
group.add(cube2);
group.add(cube3);

const sizes = {
    width: 800,
    height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

group.rotation.x = Math.PI * 0.15;
group.rotation.y = Math.PI * 0.1;

scene.add(group);
scene.add(camera);
scene.add(axesHelper);
renderer.render(scene, camera);

console.log(group.position.length());
console.log(group.position.distanceTo(camera.position));
console.log(group.position.normalize());