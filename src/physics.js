import Vector from '@nonphoto/vector'

export function resolveCollision(manifold) {
    if (!manifold) return

    const {a, b, normal, penetration} = manifold

    const relativeVelocity = Vector.clone(b.velocity).subtract(a.velocity)
    const normalVelocity = relativeVelocity.dot(normal)

    if (normalVelocity > 0) return

    const restitution = Math.min(a.restitution, b.restitution)

    const impulseMagnitude = (1 + restitution) * normalVelocity / (a.inverseMass + b.inverseMass)

    const impulse = Vector.clone(normal).scale(impulseMagnitude)
    a.applyForce(impulse)
    a.randomizeAngularVelocity()

    const oppositeImpulse = Vector.clone(normal).scale(-impulseMagnitude)
    b.applyForce(oppositeImpulse)
    b.randomizeAngularVelocity()
}

export function collideCircleAndCircle(a, b) {

    const separation = Vector.clone(b.position).subtract(a.position)
    const combinedRadius = a.radius + b.radius
    const distance = separation.length

    if (distance > combinedRadius) {
        return null
    }
    else if (distance !== 0) {
        const penetration = distance - combinedRadius
        const normal = separation.normalize()
        return {a, b, penetration, normal}
    }
    else {
        const penetration = combinedRadius
        const normal = Vector.random()
        return {a, b, penetration, normal}
    }
}

export function collideRectAndCircle(rect, circle) {
    const closestPoint = rect.getClosestPoint(circle.position)
    const separation = Vector.clone(circle.position).subtract(closestPoint)
    const distance = separation.length

    if (distance > circle.radius) {
        return null
    }
    else {
        const penetration = distance - circle.radius
        const normal = separation.normalize()
        return {a: rect, b: circle, penetration, normal}
    }
}

export function collideEntityAndLine(entity, line) {
    const separation = Vector.clone(entity.position).subtract(line.position)
    const distance = separation.dot(line.normal)

    if (distance > 0) {
        return null
    }
    else {
        return {a: line, b: entity, penetration: distance, normal: line.normal}
    }
}