import {vec2} from 'gl-matrix'
import * as physics from './physics.js'
import Entity from './entity.js'
import Circle from './circle.js'
import Rect from './rect.js'

export default class Line extends Entity {
    constructor(x, y, dx, dy, isVisible = false) {
        super(x, y, 0, Infinity)

        this.normal = vec2.fromValues(dx, dy)
        vec2.normalize(this.normal, this.normal)

        this.isVisible = isVisible
        this.length = 100
    }

    draw(context) {
        if (this.isVisible) {
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

    collide(that) {
        return physics.collideEntityAndLine(that, this)
    }
}