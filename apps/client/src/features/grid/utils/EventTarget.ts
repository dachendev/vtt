type EventCallback = (data: any) => void;

export class EventTarget {
  private listeners: Map<string, Set<EventCallback>> = new Map();

  addListener(type: string, callback: EventCallback): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);
  }

  removeListener(type: string, callback: EventCallback) {
    const fns = this.listeners.get(type);
    if (!fns) return;

    fns.delete(callback);

    if (fns.size === 0) {
      this.listeners.delete(type);
    }
  }

  removeAllListeners() {
    this.listeners.clear();
  }

  dispatchEvent(type: string, data: any): void {
    const fns = this.listeners.get(type);
    if (fns) {
      fns.forEach((fn) => fn(data));
    }
  }
}
