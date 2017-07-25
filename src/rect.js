import {vec2} from 'gl-matrix'
import Entity from './entity.js'

export default class Rect extends Entity {
    constructor(x, y, rw, rh) {
        super(x, y)
        this.dimensions = vec2.fromValues(rw, rh)
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
        return null
    }
}