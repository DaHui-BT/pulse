import { createVNode, render } from 'vue'
import { Spin } from 'ant-design-vue'

let loadingContainer: HTMLElement | null = null

const Loading = {
  show() {
    if (!loadingContainer) {
      // Create a container for the loading spinner
      loadingContainer = document.createElement('div')
      loadingContainer.style.position = 'fixed'
      loadingContainer.style.top = '0'
      loadingContainer.style.left = '0'
      loadingContainer.style.width = '100%'
      loadingContainer.style.height = '100%'
      loadingContainer.style.display = 'flex'
      loadingContainer.style.justifyContent = 'center'
      loadingContainer.style.alignItems = 'center'
      loadingContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)' // Background overlay
      loadingContainer.style.zIndex = '9999' // Ensure it's on top
      document.body.appendChild(loadingContainer)

      // Create the Spin component and mount it
      const spinVNode = createVNode(Spin, { size: 'large', spinning: true })
      render(spinVNode, loadingContainer)
    }
  },
  hide() {
    if (loadingContainer) {
      // Unmount the Spin component and remove the container
      render(null, loadingContainer)
      document.body.removeChild(loadingContainer)
      loadingContainer = null
    }
  }
}

export default Loading
