import Entity from "./entity.js"

export default class Circle extends Entity {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius
    }

    draw(context) {
        const [x, y] = this.position

        context.beginPath()
        context.fillStyle = '#ff0000'
        context.arc(x, y, this.radius, 0, 2 * Math.PI)
        context.fill()
    }
}