import {vec2} from "gl-matrix"

export default class Entity {
    constructor(p) {
        if (typeof p === 'object') {
            this.p = p
        }
        else {
            this.p = vec2.create()
        }
        this.v = vec2.create()
    }

    draw(dt) {

    }
}