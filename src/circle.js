import * as physics from './physics.js'
import Entity from './entity.js'
import Line from './line.js'
import Rect from './rect.js'

export default class Circle extends Entity {
    constructor(x, y, radius, color) {
        super(x, y)
        this.radius = radius
        this.color = color
    }

    draw(context) {
        super.draw()

        const [x, y] = this.position

        context.beginPath()
        context.fillStyle = this.color
        context.arc(x, y, this.radius, 0, 2 * Math.PI)
        context.fill()
    }

    collide(that) {
        if (that instanceof Circle) {
            return physics.collideCircleAndCircle(this, that)
        }
        else if (that instanceof Line) {
            return physics.collideEntityAndLine(this, that)
        }
        else if (that instanceof Rect) {
            return physics.collideRectAndCircle(that, this)
        }
        else {
            return null
        }
    }
}