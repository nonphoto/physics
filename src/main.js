import {vec2} from "gl-matrix"
import Entity from "./entity.js"
import Circle from "./circle.js"

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const scale = window.devicePixelRatio || 1
canvas.width = canvas.clientWidth * scale
canvas.height = canvas.clientHeight * scale
context.scale(scale, scale)

let animationRequest = null

const circleA = new Circle(-100, -10, 50)
circleA.applyForce(vec2.fromValues(2, 0))

const circleB = new Circle(100, 10, 50)
circleB.applyForce(vec2.fromValues(-2, 0))

const entities = [circleA, circleB]

function start() {
    if (!animationRequest) {
        animationRequest = requestAnimationFrame(draw)
    }
}

function stop() {
    if (animationRequest) {
        cancelAnimationFrame(animationRequest)
        animationRequest = null
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#0000ff'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.save()
    context.translate(canvas.width / 2, canvas.height / 2)

    entities.forEach((entity) => {entity.needsUpdate = true})
    entities.forEach((entity) => {update(entity)})

    context.restore()

    animationRequest = requestAnimationFrame(draw)
}

function update(entity) {
    entities.forEach((pairedEntity) => {
        if (pairedEntity.needsUpdate && pairedEntity !== entity) {
            const manifold = Entity.collideCircleAndCircle(entity, pairedEntity)
            Entity.resolveCollision(manifold)
        }
    })

    entity.needsUpdate = false
    entity.draw(context)
}

start()