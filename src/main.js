import Circle from "./circle.js"
import {vec2} from "gl-matrix"

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const scale = window.devicePixelRatio || 1
canvas.width = canvas.clientWidth * scale
canvas.height = canvas.clientHeight * scale
context.scale(scale, scale)

let animationRequest = null

const entities = []
entities.push(new Circle(vec2.create(0, 0), 200))

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

    entities.forEach((entity) => {
        entity.draw(context)
    })

    context.restore()
}

start()