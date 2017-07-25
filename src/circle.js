import * as physics from './physics.js'
import Entity from './entity.js'
import Line from './line.js'

export default class Circle extends Entity {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius
    }

    draw(context) {
        super.draw()

        const [x, y] = this.position

        context.beginPath()
        context.fillStyle = '#ff0000'
        context.arc(x, y, this.radius, 0, 2 * Math.PI)
        context.fill()
    }

    collide(that) {
        if (that instanceof Circle) {
            return physics.collideCircleAndCircle(this, that)
        }
        else if (that instanceof Line) {
            return physics.collideCircleAndLine(this, that)
        }
        else {
            return null
        }
    }
}