<script>
import { Overlay } from 'trading-vue-js'

export default {
  name: 'Lines',
  mixins: [ Overlay ],
  methods: {
    meta_info() {
      return {
        author: 'Bogdan', version: '1.0.0',
        desc: 'Draw lines'
      }
    },
    draw(ctx) {
      this.$props.settings.forEach((lineSettings) => {
        this.drawLine(
            ctx,
            lineSettings.y,
            lineSettings.color,
            lineSettings.label,
            lineSettings.dotted
        )
      })
    },
    drawLine(ctx, price, color, label, dotted) {
      const layout = this.$props.layout
      ctx.strokeStyle = color
      ctx.beginPath()
      if (dotted) {
        ctx.setLineDash([10, 10])
      }
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
    use_for() {
      return ['Lines']
    },
    data_colors() {
      return [this.color]
    }
  }
}
</script>