import * as THREE from 'three'

import vert from '../../glsl/modules/brend.vert'
import frag from '../../glsl/modules/brend.frag'
import param from '../const/param'

class Brend {
    constructor(webgl) {
        this.webgl = webgl
        this.init()
    }
    init() {
        this.rtSwitch = true
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
        let cameraZ = this.height / 2 / Math.tan((70 * Math.PI) / 180 / 2)
        this.camera.position.set(0, 0, cameraZ)

        this.camera.lookAt(this.scene.position)
        this.cameraVector = new THREE.Vector3()

        this.renderTargetParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
        }

        this.fbo1 = new THREE.WebGLRenderTarget(
            this.width,
            this.height,
            this.renderTargetParameters
        )
        this.fbo1.texture.format = THREE.RGBAFormat
        this.fbo2 = new THREE.WebGLRenderTarget(
            this.width,
            this.height,
            this.renderTargetParameters
        )
        this.fbo2.texture.format = THREE.RGBAFormat

        console.log(this.fbo1.texture, this.fbo2.texture)

        this.texture = null

        this.createBrend()
    }
    createBrend() {
        this.instances = 100

        this.bufferGeometry = new THREE.TorusBufferGeometry(0.4, 0.1, 20, 100)
        this.geometry = new THREE.PlaneBufferGeometry(
            this.width,
            this.height,
            1,
            1
        )

        this.uniforms = {
            uTime: { type: 'f', value: 0 },
            uDelta: { type: 'f', value: 0 },
            tDiffuse1: {
                type: 't',
                value: null,
            },
            tDiffuse2: {
                type: 't',
                value: null,
            },
            uMixBrend: {
                type: 'f',
                value: param.cube.uMixBrend.value,
            },
        }

        param.cube.uMixBrend.gui.onChange(val => {
            this.uniforms.uMixBrend.value = val
        })

        this.material = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: this.uniforms,
            flatShading: true,
            side: THREE.FrontSide,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
    updateUniforms(time, delta) {
        this.uniforms.uTime.value = time
        this.uniforms.uDelta.value = delta
    }
    render(time, delta) {
        this.updateUniforms(time, delta)
        if (this.rtSwitch) {
            this.webgl.renderer.setRenderTarget(this.fbo2)
            this.webgl.renderer.render(this.scene, this.camera, this.fbo2)
            this.texture = this.fbo2.texture
        } else {
            this.webgl.renderer.setRenderTarget(this.fbo1)
            this.webgl.renderer.render(this.scene, this.camera, this.fbo1)
            this.texture = this.fbo1.texture
        }
        this.switch()
    }
    switch() {
        if (this.rtSwitch) {
            this.uniforms.tDiffuse2.value = this.fbo2.texture
        } else {
            this.uniforms.tDiffuse2.value = this.fbo1.texture
        }

        this.rtSwitch = !this.rtSwitch
    }
}

export default Brend
