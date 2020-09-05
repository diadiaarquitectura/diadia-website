export default class {
	constructor(id) {
		this.t = 0

		let sketch = (p) => {
			let bg
			let msk

			p.setup = () => {
				p.createCanvas(50, 50)
				bg = p.createGraphics(50, 50)
				msk = p.createGraphics(50, 50)
			}

			p.draw = () => {
				p.clear()
				msk.clear()
				msk.noStroke()
				msk.fill('white')
				msk.circle(25, 25, 25)

				let h = p.lerp(13, 37, p.sqrt(this.t))

				bg.background('white')
				bg.noStroke()
				bg.fill('black')
				bg.rect(0, 0, h, p.height)

				let clone = bg.get()
				clone.mask(msk.get())
				p.image(clone, 0, 0)
				p.noFill()
				p.circle(25, 25, 25)
			}

			function ease(t) {
				return t < 0.5 ? 4 * p.pow(t, 3) : 1 - p.pow(-2 * t + 2, 3) / 2
			}
		}

		new p5(sketch, id)
	}
}
