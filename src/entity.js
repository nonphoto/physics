import {vec2} from "gl-matrix"

export default class Entity {
    constructor(x, y, mass) {
        this.position = vec2.fromValues(x, y)
        this.velocity = vec2.create()
        this.mass = mass || 1
        this.inverseMass = 1 / this.mass
        this.restitution = 0.1

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

    static resolveCollision(manifold) {
        if (!manifold) {
            return
        }

        const {a, b, normal, penetration} = manifold

        const relativeVelocity = vec2.create()
        vec2.subtract(relativeVelocity, b.velocity, a.velocity)

        const normalVelocity = vec2.dot(relativeVelocity, normal)

        if (normalVelocity > 0) {
            return
        }

        const restitution = Math.min(a.restitution, b.restitution)

        const impulseMagnitude = (1 + restitution) * normalVelocity / (a.inverseMass + b.inverseMass)

        const impulse = vec2.create()
        vec2.scale(impulse, normal, impulseMagnitude)
        a.applyForce(impulse)

        const oppositeImpulse = vec2.create()
        vec2.scale(oppositeImpulse, normal, -impulseMagnitude)
        b.applyForce(oppositeImpulse)
    }

    static collideCircleAndCircle(a, b) {
        const separation = vec2.create()
        vec2.subtract(separation, b.position, a.position)

        const combinedRadius = a.radius + b.radius
        const distance = vec2.length(separation)

        if (distance > combinedRadius) {
            return null
        }
        else if (distance !== 0) {
            const penetration = separation - distance
            const normal = vec2.create()
            vec2.scale(normal, separation, 1 / distance)
            return {a, b, penetration, normal}
        }
        else {
            const penetration = combinedRadius
            const normal = vec2.create()
            vec2.random(normal)
            return {a, b, penetration, normal}
        }
    }
}