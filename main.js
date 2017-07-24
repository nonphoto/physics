const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const scale = window.devicePixelRatio || 1
canvas.width = canvas.clientWidth * scale
canvas.height = canvas.clientHeight * scale
context.scale(scale, scale)

let animationRequest = null

function start() {
    if (!animationRequest) {
        animationRequest = requestAnimationFrame(draw)
    }
}

function stop() {
    if (animationRequest) {
        cancelAnimationFrame(animationRequest)
        animationRequest = null
    }
}

function draw(dt) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#0000ff'
    context.fillRect(0, 0, canvas.width, canvas.height)

    const x = (canvas.width / 2)
    const y = (canvas.height / 2)
    context.fillStyle = '#ff0000'
    context.arc(x, y, 200, 0, 2 * Math.PI)
    context.fill()
}

start()

class Vector {
    constructor(components) {
        this.components
    }

    get degree() {
        this.components.length
    }

    get length() {
        return Math.sqrt(this.squareLength)
    }

    get squareLength() {
        const length = this.components.reduce((a, b) => {
            return a + (b * b)
        }, 0)
    }

    static add(u, v) {
        if (u.degree !== v.degree) {
            throw new UserException('DegreeMismatch')
        }
        else {
            const components = u.components.map((a, index) => {
                const b = v.components[index]
                return a + b
            })
            return new Vec2(components)
        }
    }

    static multiply(v, a) {
        const components = v.components.map((b) => {
            return a * b
        })
        return new Vec2(components)
    }

    static normalize(v) {
        const factor = 1 / v.length
        return Vector.multiply(v, factor)
    }
}