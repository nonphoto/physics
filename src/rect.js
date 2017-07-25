import * as physics from './physics.js'
import {vec2} from 'gl-matrix'
import Entity from './entity.js'
import Circle from './circle.js'
import Line from './line.js'

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

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

    getClosestPoint(p) {
        const x = clamp(p[0], this.bounds.left, this.bounds.right)
        const y = clamp(p[1], this.bounds.top, this.bounds.bottom)
        return vec2.fromValues(x, y)
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
        else if (that instanceof Line) {
            return physics.collideRectAndLine(this, that)
        }
        else {
            return null
        }
    }
}