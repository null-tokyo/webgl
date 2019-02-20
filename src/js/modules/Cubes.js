import * as THREE from 'three'

import vert from '../../glsl/modules/cube.vert'
import frag from '../../glsl/modules/cube.frag'

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
        this.camera.position.set(0, 0, 10)
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

        this.group = new THREE.Group()

        this.createCubes()
    }
    createObject() {}
    createCubes() {
        this.instances = 5000

        this.bufferGeometry = new THREE.BoxBufferGeometry(2, 2, 2)
        this.geometry = new THREE.InstancedBufferGeometry()

        this.geometry.index = this.bufferGeometry.index
        this.geometry.attributes.position = this.bufferGeometry.attributes.position
        this.geometry.attributes.normal = this.bufferGeometry.attributes.normal
        this.geometry.attributes.uv = this.bufferGeometry.attributes.uv

        this.uniforms = {
            uTime: { type: 'f', value: 0 },
            uDelta: { type: 'f', value: 0 },
            uColorArray: {
                type: 'v3v',
                value: [new THREE.Color(0xff2a5c), new THREE.Color(0xffe100)],
            },
        }

        let offsets = []
        let orientations = []
        let colorIndex = []

        let vector = new THREE.Vector4()
        let x, y, z, w

        for (let i = 0; i < this.instances; i++) {
            // offsets
            x = Math.random() * 100 - 50
            y = Math.random() * 100 - 50
            z = Math.random() * 100 - 50
            vector.set(x, y, z, 0).normalize()
            vector.multiplyScalar(5) // move out at least 5 units from center in current direction
            offsets.push(x + vector.x, y + vector.y, z + vector.z)

            // orientations
            x = Math.random() * 2 - 1
            y = Math.random() * 2 - 1
            z = Math.random() * 2 - 1
            w = Math.random() * 2 - 1
            vector.set(x, y, z, w).normalize()
            orientations.push(vector.x, vector.y, vector.z, vector.w)

            // color
            colorIndex.push(Math.floor(Math.random() * 2))
        }

        let offsetAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(offsets),
            3
        )

        let orientationAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(orientations),
            4
        ).setDynamic(true)

        let colorIndexAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(colorIndex),
            1,
            1
        )

        this.geometry.addAttribute('offset', offsetAttribute)
        this.geometry.addAttribute('orientation', orientationAttribute)
        this.geometry.addAttribute('colorIndex', colorIndexAttribute)

        this.material = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: this.uniforms,
            flatShading: true,
            side: THREE.DoubleSide,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
    updateUniforms(time, delta) {
        this.uniforms.uTime.value = time
        this.uniforms.uDelta.value = delta
    }
    render(time, delta) {
        this.webgl.renderer.setRenderTarget(this.fbo)

        this.updateUniforms(time, delta)

        this.webgl.renderer.render(this.scene, this.camera, this.fbo)
    }
}

export default Cubes
