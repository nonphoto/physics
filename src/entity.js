import {vec2} from "gl-matrix"

export default class Entity {
    constructor(x, y) {
        this.position = vec2.fromValues(x, y)
        this.velocity = vec2.create()
        this.mass = 1
        this.inverseMass = 1 / this.mass
    }

    static resolveCollsion(manifold) {
        const {a, b, normal, penetration} = manifold

        const relativeVelocity = vec2.create()
        vec2.subtract(relativeVelocity, a.velocity, b.velocity)

        const normalVelocity = vec2.dot(relativeVelocity, normal)

        if (normalVelocity > 0) {
            return
        }

        const restitution = min(a.restitution, b.restitution)

        const impulseMagnitude = (-1 - restitution) * normalVelocity / (a.inverseMass + b.inverseMass)

        const impulse = vec2.create()
        vec2.scale(impulse, normal, impulseMagnitude)

        a.velocity -= a.inverseMass * impulse
        b.velocity += b.inverseMass * impulse
    }
}