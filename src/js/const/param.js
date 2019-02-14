import dat from 'dat-gui'
import conf from './conf'

class Param {
    constructor() {
        this.box = {
            speedX: { value: 20, min: 1, max: 100 },
            speedY: { value: 20, min: 1, max: 100 },
        }
        if (!conf.debugMode) return
        this.init()
    }
    init() {
        this.gui = new dat.GUI()
        this.addGUI(this.box, 'box')
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
                    g = folder.add(val, 'value', val.min, val.max).name(key)
                }
            }
            val.gui = g
        }
    }
}

export default new Param()
