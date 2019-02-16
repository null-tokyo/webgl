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
        this.camera.position.set(0, 0, 1000)
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
        this.uniforms = {
            uTime: { type: 'f', value: 0 },
            uDelta: { type: 'f', value: 0 },
        }
        var loader = new THREE.TextureLoader()
        var texture = loader.load('json/text.svg')

        // マテリアルに貼り付け
        this.material = new THREE.MeshBasicMaterial({
            map: texture,
        })
        this.geometory = new THREE.PlaneBufferGeometry(157 * 2, 11 * 2)
        // this.material = new THREE.ShaderMaterial({
        //     vertexShader: vert,
        //     fragmentShader: frag,
        //     uniforms: this.uniforms,
        //     shading: THREE.FlatShading,
        //     side: THREE.DoubleSide,
        // })
        this.mesh = new THREE.Mesh(this.geometory, this.material)
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
