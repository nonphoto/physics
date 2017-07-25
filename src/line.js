import Entity from './entity.js'
import {vec2} from 'gl-matrix'

export default class Line extends Entity {
    constructor(x, y, dx, dy) {
        super(x, y)

        this.normal = vec2.fromValues(dx, dy)
        vec2.normalize(this.normal, this.normal)

        this.mass = Infinity
    }

    draw(context) {
        super.draw()

        const [x, y] = this.position
        const [dx, dy] = this.normal

        context.beginPath()

        context.strokeStyle = '#000000'
        context.moveTo(x - (dy * 50), y + (dx * 50))
        context.lineTo(x + (dy * 50), y - (dx * 50))
        context.stroke()
    }
}