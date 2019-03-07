import * as THREE from 'three'

import vert from '../../glsl/modules/cube.vert'
import frag from '../../glsl/modules/cube.frag'
import param from '../const/param'

class Cubes {
    constructor(webgl) {
        this.webgl = webgl
        this.init()
    }
    init() {
        this.mouse = { x: 0, y: 0 }
        window.addEventListener('mousemove', e => {
            this.mouse = {
                x: (window.pageXOffset / window.innerWidth) * 2 - 1,
                y: window.pageYOffset,
            }
        })

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
        this.camera.position.set(0, 4, 8)

        this.camera.lookAt(this.scene.position)
        this.cameraVector = new THREE.Vector3()

        this.light = new THREE.DirectionalLight(0xffffff, 1)

        let axesHelper = new THREE.AxesHelper(5)
        this.scene.add(axesHelper)

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
    createCubes() {
        this.instances = 100

        this.bufferGeometry = new THREE.TorusBufferGeometry(0.4, 0.1, 20, 100)
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
                value: [new THREE.Color(0xff356e), new THREE.Color(0x00ef87)],
            },
            uFogColor: { type: 'v3', value: new THREE.Color(0xcccccc) },
            uCameraDirection: {
                type: 'v3v',
                value: this.camera.getWorldDirection(this.cameraVector),
            },
            uCameraPosition: {
                type: 'v3v',
                value: this.camera.position,
            },
            uFogStart: { type: 'f', value: param.cube.uFogStart.value },
            uFogEnd: { type: 'f', value: param.cube.uFogEnd.value },
        }

        param.cube.uFogStart.gui.onChange(val => {
            this.uniforms.uFogStart.value = val
        })
        param.cube.uFogEnd.gui.onChange(val => {
            this.uniforms.uFogEnd.value = val
        })

        let offsets = []
        let orientations = []
        let colorIndex = []

        let vector = new THREE.Vector4(0, 0, 0, 0)
        let x, y, z, w

        for (let i = 0; i < this.instances; i++) {
            // offsets
            let mod = i % 10
            let index = Math.floor(i / 10)

            x = (10 / 10) * mod - 5
            y = 0
            z = (10 / 10) * index - 5
            vector.set(x, y, z, 0).normalize()
            vector.multiplyScalar(0) // move out at least 5 units from center in current direction
            offsets.push(x + vector.x, y + vector.y, z + vector.z)

            // orientations
            x = (2 / 10) * mod - 1
            y = (2 / 10) * index - 1
            z = (2 / 10) * mod - 1
            w = 1
            vector.set(x, y, z, w).normalize()
            orientations.push(vector.x, vector.y, vector.z, vector.w)

            // color
            colorIndex.push(Math.floor(Math.random() * 1.5 + 0.5))
        }

        let offsetAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(offsets),
            3
        )

        this.orientationAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(orientations),
            4
        ).setDynamic(true)

        let colorIndexAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(colorIndex),
            1
        )

        this.geometry.addAttribute('offset', offsetAttribute)
        this.geometry.addAttribute('orientation', this.orientationAttribute)
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

        this.moveQ = new THREE.Quaternion(1.0, 1.0, 1.0, 0.0)
        this.tmpQ = new THREE.Quaternion()
        this.currentQ = new THREE.Quaternion()
    }
    updateUniforms(time, delta) {
        this.uniforms.uTime.value = time
        this.uniforms.uDelta.value = delta
        //this.uniforms.uCameraDirection.value = this.camera.getWorldDirection()
    }
    render(time, delta) {
        this.webgl.renderer.setRenderTarget(this.fbo)

        this.tmpQ
            .set(
                this.moveQ.x * delta * 1.5,
                this.moveQ.y * delta * 1.5,
                this.moveQ.z * delta * 1.5,
                1
            )
            .normalize()

        for (var i = 0, il = this.orientationAttribute.count; i < il; i++) {
            this.currentQ.fromArray(this.orientationAttribute.array, i * 4)
            this.currentQ.multiply(this.tmpQ)
            this.orientationAttribute.setXYZW(
                i,
                this.currentQ.x,
                this.currentQ.y,
                this.currentQ.z,
                this.currentQ.w
            )
        }

        this.orientationAttribute.needsUpdate = true

        this.updateUniforms(time, delta)

        this.webgl.renderer.render(this.scene, this.camera, this.fbo)

        // this.camera.position.set(
        //     3 * Math.cos(time * 0.1),
        //     0,
        //     3 * Math.sin(time * 0.1)
        // )
        this.camera.lookAt(this.scene.position)
    }
}

export default Cubes
