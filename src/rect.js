import * as physics from './physics.js'
import Entity from './entity.js'
import Circle from './circle.js'
import Line from './line.js'
import {vec2, mat2} from 'gl-matrix'
import Vector from '@nonphoto/vector'

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

export default class Rect extends Entity {
    constructor(x, y, rw, rh, color) {
        const rotation = Math.random() * Math.PI * 2
        super(x, y, rotation)
        this.dimensions = new Vector(rw, rh)
        this.color = color
    }

    get bounds() {
        const { x, y } = this.position
        const [ rw, rh ] = this.dimensions.toArray()

        return {
            top: y - rh,
            bottom: y + rh,
            left: x - rw,
            right: x + rw
        }
    }

    getClosestPoint(point) {
        const [rw, rh] = this.dimensions.toArray()
        const a = Vector.clone(point).subtract(this.position).rotate(-this.rotation)
        const x = clamp(a.x, -rw, rw)
        const y = clamp(a.y, -rh, rh)
        const b = new Vector(x, y).rotate(this.rotation).add(this.position)
        return b
    }

    draw(context) {
        super.draw()

        const point = this.getClosestPoint(new Vector())

        const { x, y } = this.position
        const [ rw, rh ] = this.dimensions.toArray()

        context.save()
        context.translate(x, y)
        context.rotate(this.rotation)

        context.beginPath()
        context.fillStyle = this.color
        context.rect(-rw, -rh, rw * 2, rh * 2)
        context.fill()

        context.restore()

        context.beginPath()
        context.fillStyle = '#ffffff'
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI)
        context.fill()
    }

    collide(that) {
        if (that instanceof Circle) {
            return physics.collideRectAndCircle(this, that)
        }
        else if (that instanceof Line) {
            return physics.collideEntityAndLine(this, that)
        }
        else {
            return null
        }
    }
}