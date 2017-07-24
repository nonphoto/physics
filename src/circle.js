import Entity from "./entity.js"

export default class Circle extends Entity {
    constructor(p, r) {
        super(p)
        this.r = r
    }

    draw(context) {
        context.beginPath()
        context.fillStyle = '#ff0000'
        context.arc(this.p[0], this.p[1], this.r, 0, 2 * Math.PI)
        context.fill()
    }
}