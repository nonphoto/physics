import {vec2} from 'gl-matrix'
import Entity from './entity.js'
import Circle from './circle.js'

export default class Rect extends Entity {
    constructor(x, y, rw, rh) {
        super(x, y)
        this.dimensions = vec2.fromValues(rw, rh)
    }

    get bounds() {
        const [x, y] = this.position
        const [rw, rh] = this.dimensions

        return {
            top: y - rh,
            bottom: y + rh,
            left: x - rw,
            right: x + rw
        }
    }

    draw(context) {
        super.draw()

        const [x, y] = this.position
        const [rw, rh] = this.dimensions

        context.beginPath()
        context.fillStyle = '#ff00ff'
        context.rect(x - rw, y - rh, rw * 2, rh * 2)
        context.fill()
    }

    collide(that) {
        if (that instanceof Circle) {
            return physics.collideRectAndCircle(this, that)
        }
        else {
            return null
        }
    }
}