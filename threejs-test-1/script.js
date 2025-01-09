import './style.css'
import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const gui = new GUI()

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(1, 32, 32)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gui.add( material, 'wireframe' )
gui.add( mesh.position, 'y', - 3, 3, 0.01 ).name( 'Elevation' )
gui
    .addColor(material, 'color')
    .name('Color')
    .onChange((value) => {
        console.log(material.color + " " + value.getHexString())
    })

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    }
    else {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()