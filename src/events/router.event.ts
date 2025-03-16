import { useRouter } from 'vue-router'

import Event from '../constant/event'
import EventBus from '../tools/eventbus'


export default function registerStoreEvent() {
  const router = useRouter()
  const event = new EventBus()

  event.on(Event.UNAUTHORIZED, () => {
    router.push({
      name: 'Login',
      query: {
        from: router.currentRoute.value.path,
        ...(router.currentRoute.value.params || {})
      }
    })
  })
}
