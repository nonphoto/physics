import Vector from '@nonphoto/vector'

export default class Entity {
    constructor(x = 0, y = 0, rotation = 0, mass = 1, restitution = 1) {
        this.position = new Vector(x, y)
        this.velocity = new Vector()
        this.rotation = rotation
        this.randomizeAngularVelocity()
        this.mass = mass
        this.inverseMass = 1 / this.mass
        this.restitution = restitution
        this.needsUpdate = false
    }

    randomizeAngularVelocity(maxVelocity = 0.01) {
        this.angularVelocity = (Math.random() * maxVelocity * 2) - maxVelocity
    }

    applyForce(f) {
        const acceleration = Vector.clone(f).scale(this.inverseMass)
        this.velocity.add(acceleration)
    }

    draw() {
        this.position.add(this.velocity)
        this.rotation += this.angularVelocity
    }

    collide() {

    }
}