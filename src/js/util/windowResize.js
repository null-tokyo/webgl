import debounce from 'lodash/debounce'

class windowResize {
    constructor() {
        this.width
        this.height
        this.aspect
        this.instances = []
        this.init()
    }
    init() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspect = this.width / this.height
        this.onResize = e => this._onResize(e)
        window.addEventListener('resize', debounce(this.onResize, 100))
    }
    _onResize() {
        if (this.instances.length === 0) return

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspect = this.width / this.height
        for (let i = 0; i < this.instances.length; i++) {
            this.instances[i].onResize()
        }
    }
    register(instance) {
        this.instances.push(instance)
    }
}

export default new windowResize()
