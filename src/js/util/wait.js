/**
 * 遅延用関数
 */
function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export default wait
