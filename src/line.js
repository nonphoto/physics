import * as physics from './physics.js'
import Entity from './entity.js'
import Circle from './circle.js'
import Rect from './rect.js'
import Vector from '@nonphoto/vector'

export default class Line extends Entity {
    constructor(x, y, dx, dy, isVisible = false) {
        super(x, y, 0, Infinity)

        this.normal = new Vector(dx, dy).normalize()
        this.isVisible = isVisible
        this.length = 100
    }

    draw(context) {
        if (this.isVisible) {
            const { x, y } = this.position

            const d = Vector.clone(this.normal).scale(this.length)
            const [ dx, dy ] = d.toArray()

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