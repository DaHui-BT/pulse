import singleton from "./single"

class EventBus {
  events = new Map<string, Set<(...args: any[]) => any>>()

  on(eventName: string, callback: (...args: any[]) => any) {
    const targetEvent = this.events.get(eventName)
    if (targetEvent) {
      targetEvent.add(callback)
    } else {
      this.events.set(eventName, new Set([callback]))
    }
  }

  emit(eventName: string, ...payload: any[]) {
    const targetEvent = this.events.get(eventName)
    if (targetEvent) {
      targetEvent.forEach(cal => cal(...payload))
    } else {
      throw new Error('No such event')
    }
  }
}

export default singleton(EventBus)
