import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Utils/Camera.js'

let instance = null

export default class Experience {
    constructor(canvas) {
        if(instance) {
            return instance
        }

        instance = this

        window.experience = this

        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.Camera = new Camera(this)

        console.log(this.sizes.width)
        console.log(this.sizes.height)
        console.log(this.sizes.pixelRatio)

        this.sizes.on('resize', () => {
            console.log('a risize occured!')
        })

        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
    }

    update() {
        this.camera.update()
    }
}