import {vec2} from "gl-matrix"

export default class Entity {
    constructor(x, y) {
        this.p = vec2.fromValues(x, y)
        this.v = vec2.create()
    }

    draw(dt) {

    }
}