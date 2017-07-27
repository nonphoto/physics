import * as physics from './physics.js'
import Entity from './entity.js'
import Circle from './circle.js'
import Line from './line.js'
import Rect from './rect.js'

const entities = {Entity, Circle, Line, Rect}
Object.assign(physics, entities)

export default physics