export class EventManager<
  T extends EventTarget,
  M extends Record<string, any>
> {
  listeners: Map<keyof M, Set<(event: any) => void>> = new Map();

  constructor(public target: T) {}

  on<K extends keyof M>(type: K, listener: (event: M[K]) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener);
    this.target.addEventListener(type as string, listener as EventListener);
  }

  off<K extends keyof M>(type: K, listener: (event: M[K]) => void) {
    const listeners = this.listeners.get(type);
    if (!listeners) return;

    listeners.delete(listener);
    this.target.removeEventListener(type as string, listener as EventListener);

    if (listeners.size === 0) {
      this.listeners.delete(type);
    }
  }

  removeAllListeners() {
    this.listeners.forEach((listeners, type) => {
      listeners.forEach((listener) => {
        this.target.removeEventListener(type as string, listener);
      });
    });
    this.listeners.clear();
  }
}
