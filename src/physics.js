import {vec2} from 'gl-matrix'

export function resolveCollision(manifold) {
    if (!manifold) return

    const {a, b, normal, penetration} = manifold

    const relativeVelocity = vec2.create()
    vec2.subtract(relativeVelocity, b.velocity, a.velocity)

    const normalVelocity = vec2.dot(relativeVelocity, normal)

    if (normalVelocity > 0) return

    const restitution = Math.min(a.restitution, b.restitution)

    const impulseMagnitude = (1 + restitution) * normalVelocity / (a.inverseMass + b.inverseMass)

    const impulse = vec2.create()
    vec2.scale(impulse, normal, impulseMagnitude)
    a.applyForce(impulse)

    const oppositeImpulse = vec2.create()
    vec2.scale(oppositeImpulse, normal, -impulseMagnitude)
    b.applyForce(oppositeImpulse)
}

export function collideCircleAndCircle(a, b) {
    const separation = vec2.create()
    vec2.subtract(separation, b.position, a.position)

    const combinedRadius = a.radius + b.radius
    const distance = vec2.length(separation)

    if (distance > combinedRadius) {
        return null
    }
    else if (distance !== 0) {
        const penetration = distance - combinedRadius
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

export function collideCircleAndLine(circle, line) {
    const separation = vec2.create()
    vec2.subtract(separation, circle.position, line.position)
    vec2.dot(separation, separation, line.normal)

    const distance = vec2.length(separation)

    if (distance > circle.radius) {
        return null
    }
    else {
        const penetration = distance - radius
        const normal = line.normal
        return {circle, line, penetration, normal}
    }
}