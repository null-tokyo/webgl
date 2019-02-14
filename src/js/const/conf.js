import UAParser from 'ua-parser-js'

class Conf {
    constructor() {
        this.debugMode = true
        this.ua = new UAParser().getResult()
    }
}

export default new Conf()
