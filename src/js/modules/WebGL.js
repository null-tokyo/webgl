import param from '../const/param'
import * as THREE from 'three'
import windowResize from '../util/windowResize'
import Cubes from '../modules/Cubes'
import Brend from '../modules/Brend'

import vert from '../../glsl/modules/output.vert'
import frag from '../../glsl/modules/output.frag'

class WebGL {
    constructor() {
        this.width
        this.height
        this.aspect
        this.size
        this.$container
        this.renderer
        this.props
        this.clock
    }
    init() {
        this.render = () => this._render()

        this.width = 2048
        this.height = 2048
        this.aspect = this.width / this.height
        this.size = 32
        this.setProps()

        this.$container = document.getElementById('canvas')
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
        this.renderer.setSize(this.props.width, this.props.height)
        this.renderer.setClearColor(0xcccccc, 1.0)
        this.renderer.setPixelRatio(this.props.pixelRatio)
        this.$container.appendChild(this.renderer.domElement)

        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()

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

        windowResize.register(this)

        this.cubes = new Cubes(this)
        this.brend = new Brend(this)

        this.createPlane()

        this.brend.uniforms.tDiffuse1 = this.cubes.fbo.texture
        //this.brend.uniforms.tDiffuse2 = this.cubes.fbo.texture

        setTimeout(() => {
            this.render()
        }, 1000)
    }
    createPlane() {
        this.uniforms = {
            uTex: { type: 't', value: this.brend.texture },
            uTime: { type: 'f', value: 0 },
            uDelta: { type: 'f', value: 0 },
            uNoiseForce: {
                type: 'f',
                value: param.cube.uNoiseForce.value,
            },
            uNoiseRange: {
                type: 'f',
                value: param.cube.uNoiseForce.value,
            },
        }

        param.cube.uNoiseForce.gui.onChange(val => {
            this.uniforms.uNoiseForce.value = val
        })
        param.cube.uNoiseRange.gui.onChange(val => {
            this.uniforms.uNoiseRange.value = val
        })

        this.geometry = new THREE.PlaneBufferGeometry(
            this.width,
            this.height,
            100,
            100
        )
        this.material = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: this.uniforms,
            flatShading: true,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)

        let scale =
            windowResize.aspect > this.aspect
                ? windowResize.width / this.width
                : windowResize.height / this.height

        this.plane.scale.x = scale
        this.plane.scale.y = scale

        this.scene.add(this.plane)
    }
    updateUniforms(time, delta) {
        this.uniforms.uTime.value = time
        this.uniforms.uDelta.value = delta
        this.uniforms.uTex.value = this.brend.texture
    }
    _render() {
        this.renderer.clear()

        let time = this.clock.elapsedTime
        let delta = this.clock.getDelta()

        this.cubes.render(time, delta)

        this.brend.uniforms.tDiffuse1.value = this.cubes.fbo.texture
        this.brend.render(time, delta)

        this.updateUniforms(time, delta)

        this.renderer.render(this.scene, this.camera)

        // this.brend.uniforms.tDiffuse1.value = this.cubes.fbo.texture
        // this.brend.render(time, delta)

        requestAnimationFrame(this.render)
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

        let scale =
            windowResize.aspect > this.aspect
                ? windowResize.width / this.width
                : windowResize.height / this.height

        this.plane.scale.x = scale
        this.plane.scale.y = scale

        this.renderer.render(this.scene, this.camera)
    }
}

export default WebGL
