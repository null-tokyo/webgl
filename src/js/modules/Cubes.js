import * as THREE from 'three'

class Cubes {
    constructor(webgl) {
        this.webgl = webgl
        this.init()
    }
    init() {
        this.width = this.webgl.width
        this.height = this.webgl.height
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            70,
            this.width / this.height,
            0.01,
            10000
        )
        this.scene.add(this.camera)
        this.camera.position.set(-1, 3, 1)
        this.camera.lookAt(this.scene.position)

        this.renderTargetParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
        }

        this.fbo = new THREE.WebGLRenderTarget(
            this.width,
            this.height,
            this.renderTargetParameters
        )
        this.fbo.texture.format = THREE.RGBAFormat

        this.createCubes()
    }
    createCubes() {
        this.geometory = new THREE.BoxGeometry(1, 1, 1)
        let materials = [
            new THREE.MeshBasicMaterial({ color: 0x1abc9c }),
            new THREE.MeshBasicMaterial({ color: 0x3498db }),
            new THREE.MeshBasicMaterial({ color: 0x9b59b6 }),
            new THREE.MeshBasicMaterial({ color: 0xf1c40f }),
            new THREE.MeshBasicMaterial({ color: 0xe74c3c }),
            new THREE.MeshBasicMaterial({ color: 0x34495e }),
        ]

        this.material = new THREE.MeshFaceMaterial(materials)
        this.mesh = new THREE.Mesh(this.geometory, this.material)
        this.scene.add(this.mesh)
    }
    render(time, delta) {
        this.webgl.renderer.setRenderTarget(this.fbo)

        this.mesh.rotation.x += 0.02
        this.mesh.rotation.y += 0.02

        this.webgl.renderer.render(this.scene, this.camera, this.fbo)
    }
}

export default Cubes
