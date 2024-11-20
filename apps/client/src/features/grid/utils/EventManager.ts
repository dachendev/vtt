type EventType = keyof HTMLElementEventMap;

type EventListener<T extends EventType> = (
  event: HTMLElementEventMap[T]
) => void;

export class EventManager {
  listeners: Map<EventType, Set<EventListener<any>>> = new Map();

  constructor(public element: HTMLElement) {}

  on<T extends EventType>(type: T, listener: EventListener<T>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener);
    this.element.addEventListener(type, listener);
  }

  off<T extends EventType>(type: T, listener: EventListener<T>) {
    const listeners = this.listeners.get(type);
    if (!listeners) return;

    listeners.delete(listener);
    this.element.removeEventListener(type, listener);

    if (listeners.size === 0) {
      this.listeners.delete(type);
    }
  }

  removeAllListeners() {
    this.listeners.forEach((listeners, type) => {
      listeners.forEach((listener) => {
        this.element.removeEventListener(type, listener);
      });
    });
    this.listeners.clear();
  }
}
