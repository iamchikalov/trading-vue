<script>
import { Overlay } from 'trading-vue-js'
export default {
  name: 'Density',
  mixins: [Overlay],
  methods: {
    meta_info() {
      return {
        author: 'Bogdan', version: '1.0.0',
        desc: 'Densities'
      }
    },
    draw(ctx) {
      this.drawLine(
          ctx,
          this.$props.settings.density,
          this.$props.settings.density_color,
          this.$props.settings.density_label)
    },
    drawLine(ctx, price, color, label) {
      const layout = this.$props.layout
      ctx.strokeStyle = color
      ctx.beginPath()
      let y = layout.$2screen(price)
      ctx.moveTo(0, y)
      ctx.lineTo(layout.width, y)
      ctx.stroke()
      let w = ctx.canvas.width
      //ctx.fillRect(0, y, w + 1, 10)
      ctx.fillStyle = color
      ctx.textColor = color
      ctx.textAlign = 'right'
      ctx.font = '20px consolas'
      ctx.fillText(label, w - 10, y - 3)
    },
    use_for() { return ['Density'] },
    data_colors() { return [this.color] }
  }
}
</script>