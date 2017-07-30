export default class Vector {
    constructor(x, y) {
        this.x = x || 0
        this.y = y || 0
    }

    get squareLength() {
        return (this.x * this.x) + (this.y * this.y)
    }

    get length() {
        return Math.sqrt(this.squareLength)
    }

    set length(value) {
        this.normalize().scale(value)
    }

    get angle() {
        return Math.atan2(this.x, this.y)
    }

    set angle(value) {
        const length = this.length
        this.x = Math.cos(value) * length
        this.y = Math.sin(value) * length
    }

    add(that) {
        this.x += that.x
        this.y += that.y
        return this
    }

    subtract(that) {
        this.x -= that.x
        this.y -= that.y
        return this
    }

    multiply(that) {
        this.x *= that.x
        this.y *= that.y
        return this
    }

    divide(that) {
        this.x /= that.x
        this.y /= that.y
        return this
    }

    scale(value) {
        this.x *= value
        this.y *= value
        return this
    }

    rotate(value) {
        this.x = (x * Math.cos(value)) - (y * Math.sin(value))
        this.y = (x * Math.sin(value)) + (y * Math.cos(value))
        return this
    }

    dot(that) {
        return (this.x * that.x) + (this.y * that.y)
    }

    cross(that) {
        return (this.x * that.y) - (this.y * that.x)
    }

    equals(that) {
        return (this.x === that.x) && (this.y === that.y)
    }

    max(that) {
        this.x = Math.max(this.x, that.x)
        this.y = Math.max(this.y, that.y)
        return this
    }

    min(that) {
        this.x = Math.min(this.x, that.x)
        this.y = Math.min(this.y, that.y)
        return this
    }

    lerp(that, t) {
        this.x = this.x + (t * (that.x - this.x))
        this.y = this.y + (t * (that.y - this.y))
        return this
    }

    normalize() {
        return this.scale(1 / this.length)
    }

    invert() {
        this.x = 1 / this.x
        this.y = 1 / this.y
        return this
    }

    negate() {
        this.x *= -1
        this.y *= -1
        return this
    }

    floor() {
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
        return this
    }

    ceil() {
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
        return this
    }

    round() {
        this.x = Math.round(this.x)
        this.y = Math.floor(this.y)
        return this
    }

    toArray() {
        return [this.x, this.y]
    }

    toString() {
        return `[` + this.x + ', ' + this.y + ']'
    }

    static clone(source) {
        return new Vector(source.x, source.y)
    }

    static random() {
        const angle = Math.random() * Math.PI * 2
        return Vector.fromPolar(angle, 1)
    }

    static fromPolar(angle, length) {
        const x = Math.cos(angle) * length
        const y = Math.sin(angle) * length
        return new Vector(x, y)
    }

    static fromArray(values) {
        return new Vector(values[0], values[1])
    }
}