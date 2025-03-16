<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, reactive, nextTick } from 'vue';
import { getDayByDayCount, getDayCountByLasteYear, getMonthByDayCount, getYearByDayCount } from '../utils/date';

type Square = {
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor: string,
  strokeColor: string,
  hoverColor: string,
  tooltipText: string,
  contributes: number,
  year: number,
  month: number,
  day: number
}

const props = defineProps({
  data: {
    type: Object as () => { date: Date, value: number }[],
    default: []
  }
})

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const tooltip = ref<HTMLDivElement | null>(null)
const tooltipText = ref<string | null>('')
const currentDate = ref<Date>(new Date())
const squareList = reactive<Square[]>([])
const monthTable = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December']
const weekTable = [
  'Sunday', 'Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]
const colorTable = [
  {level: 0, color: '#ebedf0'},
  {level: 4, color: '#9be9a8'},
  {level: 6, color: '#40c463'},
  {level: 8, color: '#30a14e'},
  {level: 12, color: '#216e39'}
]

const squareWidth = 12.5
const squareHeight = 12.5
const gap = 2.5
const offsetTop = 30
const offsetLeft = 30


/**
 * 绘制圆角矩形的函数
 * @param {CanvasRenderingContext2D} ctx - 2D 绘图上下文
 * @param {number} x - 矩形左上角的 x 坐标
 * @param {number} y - 矩形左上角的 y 坐标
 * @param {number} width - 矩形的宽度
 * @param {number} height - 矩形的高度
 * @param {number} radius - 圆角的半径
 * @param {boolean} fill - 是否填充矩形
 * @param {boolean} stroke - 是否描边矩形
 */
 function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number,
                    width: number, height: number, radius: number,
                    fill: boolean = false, stroke: boolean = false) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  let radiusObj: {tl: number, tr: number, br: number, bl: number} = {tl: 0, tr: 0, br: 0, bl: 0}
  if (typeof radius === 'number') {
    radiusObj = { tl: radius, tr: radius, br: radius, bl: radius };
  }
  ctx.beginPath();
  ctx.moveTo(x + radiusObj.tl, y);
  ctx.lineTo(x + width - radiusObj.tr, y);
  ctx.arcTo(x + width, y, x + width, y + radiusObj.tr, radiusObj.tr);
  ctx.lineTo(x + width, y + height - radiusObj.br);
  ctx.arcTo(x + width, y + height, x + width - radiusObj.br, y + height, radiusObj.br);
  ctx.lineTo(x + radiusObj.bl, y + height);
  ctx.arcTo(x, y + height, x, y + height - radiusObj.bl, radiusObj.bl);
  ctx.lineTo(x, y + radiusObj.tl);
  ctx.arcTo(x, y, x + radiusObj.tl, y, radiusObj.tl);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

function generateSquareList(count: number) {
  const row = 7
  let currentIndex = currentDate.value.getDay()
  squareList.splice(0, squareList.length)

  while (currentIndex < count + currentDate.value.getDay()) {
    const c = Math.floor(currentIndex / row)
    const r = currentIndex % row
    
    // if (squareList.length >= count) return
    const year = getYearByDayCount(c * row + r, currentDate.value)
    const month = getMonthByDayCount(c * row + r, currentDate.value)
    const day = getDayByDayCount(c * row + r, currentDate.value)
    let value = 0

    for (let d of props.data) {
      if (d.date.getTime() < new Date(year, month - 1, day + 1).getTime()
            && d.date.getTime() > new Date(year, month - 1, day).getTime()) {
        value = d.value
        break
      }
    }

    squareList.push({
      x: c * squareWidth + c * gap + offsetLeft,
      y: r * squareHeight + r * gap + offsetTop,
      width: squareWidth,
      height: squareHeight,
      fillColor: '#eeea',
      strokeColor: '#eee1',
      hoverColor: '#aaa',
      tooltipText: 'No contributions on',
      contributes: value,
      year: year,
      month: month,
      day: day
    })

    currentIndex ++
  }

  // for (let i = 0; i < column; ++ i) {
  //   for (let j = 0; j < row; ++ j) {
  //     if (squareList.length >= count) return
  //     const year = getYearByDayCount(i * row + j, currentDate.value)
  //     const month = getMonthByDayCount(i * row + j, currentDate.value)
  //     const day = getDayByDayCount(i * row + j, currentDate.value)
  //     let value = 0
  //     // TODO correct the start week
  //     if (i === 0 && j <= currentDate.value.getDay()) {
  //       // const d = getDateByDayCount(i * row + j, currentDate.value).getDay()
  //       // console.log(d)
  //       continue
  //     }

  //     for (let d of props.data) {
  //       if (d.date.getTime() < new Date(year, month - 1, day + 1).getTime()
  //            && d.date.getTime() > new Date(year, month - 1, day).getTime()) {
  //         value = d.value
  //         break
  //       }
  //     }

  //     squareList.push({
  //       x: i * squareWidth + i * gap + offsetLeft,
  //       y: j * squareHeight + j * gap + offsetTop,
  //       width: squareWidth,
  //       height: squareHeight,
  //       fillColor: '#eeea',
  //       strokeColor: '#eee1',
  //       hoverColor: '#aaa',
  //       tooltipText: 'No contributions on',
  //       contributes: value,
  //       year: year,
  //       month: month,
  //       day: day
  //     })
  //   }
  // }
}

function drawSquare(ctx: CanvasRenderingContext2D, squareList: Square[]) {
  for (let square of squareList) {
    let currentColor = colorTable[colorTable.length - 1].color
    for (let color of colorTable) {
      if (square.contributes <= color.level) {
        currentColor = color.color
        break
      }
    }
    ctx.fillStyle = currentColor
    ctx.strokeStyle = square.strokeColor;

    roundRect(ctx, square.x, square.y, square.width, square.height, 3, true, true)
    ctx.stroke();
  }
}

function drawMonth(ctx: CanvasRenderingContext2D, squareList: Square[]) {
  for (let i = 0; i < squareList.length; ++ i) {
    if (squareList[i].day == 1 || i == 0) {
      ctx.fillStyle = '#666'
      ctx.fillText(monthTable[squareList[i].month - 1].slice(0, 3),
                   squareList[i].x + (i == 0 ? 0 : 1) * (squareWidth + gap), 20)
    }
  }
}

function drawWeek(ctx: CanvasRenderingContext2D) {
  for (let i = 1; i < weekTable.length; i += 2) {
    ctx.fillStyle = '#666'
    ctx.fillText(weekTable[i].slice(0, 3), 5, i * (squareHeight + gap) + offsetTop + 10)
  }
}

function hoverHandler(e: MouseEvent) {
  const clickX = e.offsetX, clickY = e.offsetY
  tooltipText.value = null

  for (let square of squareList) {
    if ((clickX > square.x && clickX < square.x + square.width) &&
        (clickY > square.y && clickY < square.y + square.height)) {
      
      if (square.contributes == 0) {
        tooltipText.value = `${square.tooltipText} on ${monthTable[square.month - 1]} ${square.day}th`
      } else if (square.contributes == 1) {
        tooltipText.value = `1 contribution on ${monthTable[square.month - 1]} ${square.day}th`
      } else {
        tooltipText.value = `${square.contributes} contributions on ${monthTable[square.month - 1]} ${square.day}th`
      }
      void tooltip.value?.offsetWidth
      nextTick(() => {
        if (tooltip.value && canvas.value) {
          const canvasRect = canvas.value.getBoundingClientRect()
          const tooltipRect = tooltip.value.getBoundingClientRect()
          
          let left = square.x - tooltipRect.width / 2 + canvasRect.left
          let top = square.y - tooltipRect.height

          if (left < 0) {
            left = 0
          } else if (left + tooltipRect.width > canvasRect.width) {
            left = canvasRect.width - tooltipRect.width
          }
          if (top < 0) {
            top = 0
          } else if (top > canvasRect.height) {
            top = canvasRect.bottom
          }

          tooltip.value.style.left = left + 'px'
          tooltip.value.style.top = top + 'px'
        }
      })
      break
    }
  }
  ctx.value && drawSquare(ctx.value, squareList)
}

function clickHandler(e: MouseEvent) {
  const clickX = e.offsetX, clickY = e.offsetY

  for (let square of squareList) {
    if ((clickX > square.x && clickX < square.x + square.width) &&
        (clickY > square.y && clickY < square.y + square.height)) {
      console.log('first')
      break
    }
  }
}

function windowHover(e: MouseEvent) {
  if (canvas.value) {
    const canvasRect = canvas.value.getBoundingClientRect()
    if (e.clientX < canvasRect.left || e.clientX > canvasRect.right ||
        e.clientY < canvasRect.top || e.clientY > canvasRect.bottom) {
      tooltipText.value = null
    }
  } else {
    window.removeEventListener('mousemove', windowHover)
  }
}

onMounted(() => {
  const drawer = canvas.value as HTMLCanvasElement
  ctx.value = drawer.getContext('2d')

  if (ctx.value) {
    // 获取设备像素比
    const dpr = window.devicePixelRatio || 1;

    // 获取 Canvas 的原始宽度和高度
    const rect = drawer.getBoundingClientRect();
    drawer.width = rect.width * dpr;
    drawer.height = rect.height * dpr;

    // 设置 Canvas 的样式宽度和高度
    drawer.style.width = rect.width + 'px';
    drawer.style.height = rect.height + 'px';

    // 调整缩放比例
    ctx.value.scale(dpr, dpr);
    
    ctx.value.clearRect(0, 0, 800, 170)
    ctx.value.beginPath()
    ctx.value.lineWidth = 0.2

    currentDate.value = new Date()
    const count = getDayCountByLasteYear(currentDate.value)
    generateSquareList(count)
    drawSquare(ctx.value, squareList)
    drawMonth(ctx.value, squareList)
    drawWeek(ctx.value)
    ctx.value.stroke()
    
    drawer.addEventListener('mousemove', hoverHandler)
    drawer.addEventListener('click', clickHandler)
    window.addEventListener('mousemove', windowHover)
  }
})

onBeforeUnmount(() => {
  canvas.value?.removeEventListener('mousemove', hoverHandler)
  canvas.value?.removeEventListener('click', clickHandler)
  window.removeEventListener('mousemove', windowHover)
})

</script>

<template>
  <div class="contribution">
    <div class="contribution-container">
      <canvas class="contribution-canvas" ref="canvas"></canvas>
    </div>
    <div class="color-table">
      <p>Learn how we count contributions</p>
      <div class="color-table-container">
        less
        <span class="color-table-item" v-for="color in colorTable"
              :key="color.level" :style="{'background-color': color.color}"></span>
        more
      </div>
    </div>
    <div class="tooltip" ref="tooltip" v-show="tooltipText">{{ tooltipText }}</div>
  </div>
</template>

<style scoped lang="scss">
.contribution {
  position: relative;

  .contribution-container {
    overflow-x: auto;

    .contribution-canvas {
      width: 100%;
      min-width: 840px;
      height: 150px;
    }
  }

  .color-table {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 12px;

    .color-table-container {
      display: flex;
      gap: 5px;

      .color-table-item {
        width: 12.5px;
        height: 12.5px;
        border-radius: 3px;
      }
    }
  }

  .tooltip {
    position: absolute;
    padding: 5px 10px;
    background-color: #333;
    font-size: 12px;
    color: #fff;
    border-radius: 8px;
    z-index: 1;
  }
}
</style>