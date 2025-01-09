import * as THREE from 'three'

console.log(THREE);

const scene = new THREE.Scene();
const canvas = document.querySelector('canvas.webgl');
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

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

scene.add(mesh);
scene.add(camera);
renderer.render(scene, camera);