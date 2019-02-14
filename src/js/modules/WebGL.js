import * as THREE from 'three'
import windowResize from '../util/windowResize'

class WebGL {
    constructor() {
        this.width
        this.height
        this.$container
        this.renderer
        this.props
    }
    init() {
        this.setProps()
        this.$container = document.getElementById('canvas')
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
        this.renderer.setSize(this.props.width, this.props.height)
        this.renderer.setClearColor(0xffffff, 0.0)
        this.renderer.setPixelRatio(this.props.pixelRatio)
        this.$container.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()
        this.geometry = new THREE.BoxGeometry(100, 100, 100)
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        this.cube = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.cube)

        this.camera = new THREE.PerspectiveCamera(
            this.props.fov,
            this.props.aspect,
            this.props.near,
            this.props.far
        )
        let cameraZ =
            this.props.height /
            2 /
            Math.tan((this.props.fov * Math.PI) / 180 / 2)
        this.camera.position.set(0, 0, cameraZ)
        this.camera.lookAt(this.scene.position)

        this.renderer.render(this.scene, this.camera)

        windowResize.register(this)
    }
    setProps() {
        let width = windowResize.width
        let height = windowResize.height
        this.props = {
            width: width,
            height: height,
            aspect: width / height,
            fov: 45,
            left: -width / 2,
            right: width / 2,
            top: height / 2,
            bottom: -height / 2,
            near: 0.1,
            far: 10000,
            pixelRatio: window.devicePixelRatio,
            parent: document.getElementById('wrapper'),
        }
    }
    onResize() {
        this.setProps()
        this.renderer.setPixelRatio(this.props.pixelRatio)
        this.renderer.setSize(this.props.width, this.props.height)
        this.camera.aspect = this.props.aspect
        let cameraZ =
            this.props.height /
            2 /
            Math.tan((this.props.fov * Math.PI) / 180 / 2)
        this.camera.position.set(0, 0, cameraZ)
        this.camera.lookAt(this.scene.position)
        this.camera.updateProjectionMatrix()

        this.renderer.render(this.scene, this.camera)
    }
}

export default WebGL
