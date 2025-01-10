import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import GUI from 'lil-gui'

const canvas = document.querySelector('canvas.webgl')
const gui = new GUI()

const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colosSpace = THREE.SRGBColorSpace
matcapTexture.ColorSpace = THREE.SRGBColorSpace

// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture, flatShading: false})
// const material = new THREE.MeshNormalMaterial({ flatShading: true })
const material = new THREE.MeshPhysicalMaterial({ flatShading: true })
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.roughnessMap = doorRoughnessTexture
material.roughness = 1
// material.metalnessMap = doorMetalnessTexture
material.metalness = 1
material.shininess = 0.2
material.transparent = true
material.alphaMap = doorAlphaTexture
material.clearcoat = 1
material.clearcoatRoughness = 0
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)
material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [ 100, 800 ]
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const rgbeLoader = new RGBELoader()

rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
    {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping

        scene.background = environmentMap
        scene.environment = environmentMap

        console.log(environmentMap)
    })

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(2, 3, 4)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2

gui.add(material, 'roughness')
    .min(0).max(1).step(0.0001)
gui.add(material, 'roughness')
    .min(0).max(1).step(0.0001)
gui.add(material, 'clearcoat')
    .min(0).max(1).step(0.0001)
gui.add(material, 'clearcoatRoughness')
    .min(0).max(1).step(0.0001)
gui.add(material, 'sheen')
    .min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness')
    .min(0).max(1).step(0.0001)
gui.addColor(material, 'sheenColor')
gui.add(material, 'iridescence')
    .min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR')
    .min(0).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0')
    .min(0).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1')
    .min(0).max(1000).step(1)

// scene.add(ambientLight)
// scene.add(pointLight)
scene.add(camera)
scene.add(sphere, plane, torus)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    
    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime
    
    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    
}

tick()