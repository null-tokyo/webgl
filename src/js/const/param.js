import dat from 'dat-gui'
import conf from './conf'

class Param {
    constructor() {
        this.cube = {
            uNoiseForce: { value: 50, min: 1, max: 1000 },
            uNoiseRange: { value: 30, min: 1, max: 1000 },
            uFogStart: { value: 0.01, min: -20.0, max: 20.0 },
            uFogEnd: { value: 0.01, min: -20.0, max: 20.0 },
            uMixBrend: { value: 0.001, min: 0.0, max: 1.0 },
        }
        if (!conf.debugMode) return
        this.init()
    }
    init() {
        this.gui = new dat.GUI()
        this.addGUI(this.cube, 'cat')
        document.querySelector('.dg').style.zIndex = 9999
    }
    addGUI(obj, folderName) {
        const folder = this.gui.addFolder(folderName)
        for (let key in obj) {
            let val = obj[key]
            let g
            if (/Color/.test(key)) {
                g = folder.addColor(val, 'value').name(key)
            } else {
                if (val.list) {
                    g = folder.add(val, 'value', val.list).name(key)
                } else {
                    g = folder
                        .add(val, 'value', val.min, val.max, 0.001)
                        .name(key)
                }
            }
            val.gui = g
        }
    }
}

export default new Param()
