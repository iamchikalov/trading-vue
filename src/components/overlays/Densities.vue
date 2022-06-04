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
          this.$props.settings.density_up,
          this.$props.settings.density_label_up,
          this.$props.settings.density_color_up,
      )
      this.drawLine(
          ctx,
          this.$props.settings.density_low,
          this.$props.settings.density_label_low,
          this.$props.settings.density_color_low,
      )
    },
    drawLine(ctx, price, color, label) {
      const layout1 = this.$props.layout
      ctx.strokeStyle = color
      ctx.beginPath()
      let y = layout1.$2screen(price)
      ctx.moveTo(0, y)
      ctx.lineTo(layout1.width, y)
      ctx.stroke()
      let w = ctx.canvas.width
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