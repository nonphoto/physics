import * as physics from './physics.js'
import Entity from './entity.js'
import Circle from './circle.js'
import Line from './line.js'
import Rect from './rect.js'
import Vector from '@nonphoto/vector'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

// const scale = window.devicePixelRatio || 1
const scale = 1
canvas.width = canvas.clientWidth * scale
canvas.height = canvas.clientHeight * scale
context.scale(scale, scale)

let animationRequest = null

const entities = []

function createRandomEntity(type) {
    const x = Math.floor(Math.random() * 300) - 150
    const y = Math.floor(Math.random() * 400) - 200
    const dx = (Math.random() - 0.5) * 5
    const dy = (Math.random() - 0.5) * 5
    const force = new Vector(dx, dy)

    if (type === 'circle') {
        const circle = new Circle(x, y, 50, '#ff0000')
        circle.applyForce(force)
        return circle
    }
    else if (type === 'rect') {
        const rect = new Rect(x, y, 45, 45, '#ff00ff')
        rect.applyForce(force)
        return rect
    }
    else {
        return
    }
}

function createEntities() {
    for (let i = 0; i < 5; i++) {
        entities.push(createRandomEntity('circle'))
    }

    for (let i = 0; i < 5; i++) {
        entities.push(createRandomEntity('rect'))
    }

    const halfWidth = (canvas.width / 2) - 50
    const halfHeight = (canvas.height / 2) - 50

    entities.push(new Line(-halfWidth, 0, 1, 0, true))
    entities.push(new Line(halfWidth, 0, -1, 0, true))
    entities.push(new Line(0, -halfHeight, 0, 1, true))
    entities.push(new Line(0, halfHeight, 0, -1, true))
}

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
            const manifold = entity.collide(pairedEntity)
            physics.resolveCollision(manifold)
        }
    })

    entity.needsUpdate = false
    entity.draw(context)
}

createEntities()
start()