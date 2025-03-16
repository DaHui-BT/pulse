
import { message } from 'ant-design-vue'
import Event from '../constant/event'
import EventBus from '../tools/eventbus'


export default function registerStoreEvent() {
  const event = new EventBus()

  event.on(Event.UNAUTHORIZED, payload => {
    message.error(payload)
  })
}
