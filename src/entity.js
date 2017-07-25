import {vec2} from 'gl-matrix'

export default class Entity {
    constructor(x = 0, y = 0, rotation = 0, mass = 1, restitution = 1) {
        this.position = vec2.fromValues(x, y)
        this.velocity = vec2.create()
        this.rotation = rotation
        this.mass = mass
        this.inverseMass = 1 / this.mass
        this.restitution = restitution
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