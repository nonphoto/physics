import * as physics from './physics.js'
import {vec2, mat2} from 'gl-matrix'
import Entity from './entity.js'
import Circle from './circle.js'
import Line from './line.js'

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

export default class Rect extends Entity {
    constructor(x, y, rw, rh) {
        const rotation = Math.random() * 6
        super(x, y, rotation)
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

    getClosestPoint(point) {
        const transform = mat2.create()
        mat2.fromRotation(transform, -this.rotation)

        const a = vec2.create()
        vec2.subtract(a, point, this.position)
        vec2.transformMat2(a, a, transform)

        const [rw, rh] = this.dimensions
        const x = clamp(a[0], -rw, rw)
        const y = clamp(a[1], -rh, rh)
        const b = vec2.fromValues(x, y)

        mat2.fromRotation(transform, this.rotation)
        vec2.transformMat2(b, b, transform)
        vec2.add(b, b, this.position)

        return b
    }

    draw(context) {
        super.draw()

        const [x, y] = this.position
        const [rw, rh] = this.dimensions

        context.save()
        context.translate(x, y)
        context.rotate(this.rotation)

        context.beginPath()
        context.fillStyle = '#ff00ff'
        context.rect(-rw, -rh, rw * 2, rh * 2)
        context.fill()

        context.restore()
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