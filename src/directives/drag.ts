import { DirectiveBinding, VNode } from "vue"

const Drag = {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    let offsetX = 0, offsetY = 0, draggable = false, cursor = el.style.cursor
    let width = 0, height = 0

    function onMounseDown(e: MouseEvent) {
      draggable = true
      const rect = el.getBoundingClientRect()
      width = rect.width
      height = rect.height
      offsetX = e.clientX - rect.left
      offsetY = e.clientY - rect.top
    }

    function onMouseMove (e: MouseEvent) {
      if (draggable) {
        const left = e.clientX - offsetX
        const top = e.clientY - offsetY
        el.style.top = top + 'px'
        el.style.left = left + 'px'
        el.style.cursor = 'move'
        el.style.width = width + 'px'
        el.style.height = height + 'px'
      }
    }

    function onMouseUp(_e: MouseEvent) {
      if (draggable) {
        el.style.cursor = cursor
        el.style.width = width + 'px'
        el.style.height = height + 'px'
      }
      draggable = false
    }
    Drag._onMouseDown = onMounseDown
    Drag._onMouseMove = onMouseMove
    Drag._onMouseUp = onMouseUp

    el.onmousedown = onMounseDown
    document.onmousemove = onMouseMove
    document.onmouseup = onMouseUp
  },
  beforeUnmount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    el.onmouseenter = null
    document.onmousemove = null
    document.onmouseup = null
  }
}

export default Drag
