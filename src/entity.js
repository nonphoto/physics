import {vec2} from 'gl-matrix'

export default class Entity {
    constructor(x, y, mass) {
        this.position = vec2.fromValues(x, y)
        this.velocity = vec2.create()
        this.mass = mass || 1
        this.inverseMass = 1 / this.mass
        this.restitution = 1

        this.needsUpdate = false
    }

    applyForce(f) {
        const acceleration = vec2.create()
        vec2.scale(acceleration, f, this.inverseMass)
        vec2.add(this.velocity, this.velocity, acceleration)
    }

    draw() {
        vec2.add(this.position, this.position, this.velocity)
    }

    collide() {

    }
}