import Entity from './entity.js'
import {vec2} from 'gl-matrix'

export default class Line extends Entity {
    constructor(x, y, dx, dy) {
        super(x, y)

        this.normal = vec2.fromValues(dx, dy)
        vec2.normalize(this.normal, this.normal)

        this.mass = Infinity

        this.length = 100
    }

    draw(context) {
        super.draw()

        const [x, y] = this.position

        const d = vec2.create()
        vec2.scale(d, this.normal, this.length)
        const [dx, dy] = d

        context.beginPath()

        context.strokeStyle = '#000000'
        context.moveTo(x - dy, y + dx)
        context.lineTo(x + dy, y - dx)
        context.stroke()
    }
}