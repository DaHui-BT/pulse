import Event from '../constant/event'
import { useAuthStore } from '../store'
import EventBus from '../tools/eventbus'


export default function registerStoreEvent() {
  const store = useAuthStore()
  const event = new EventBus()

  event.on(Event.UNAUTHORIZED, () => {
    store.logout()
  })
}
