export class PubSub<R extends Record<string, any>> {
  subscriptions: Map<keyof R, Set<(data: any) => void>> = new Map();

  subscribe<T extends keyof R>(topic: T, callback: (data: R[T]) => void) {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
    }
    this.subscriptions.get(topic)!.add(callback);
  }

  unsubscribe<T extends keyof R>(topic: T, callback: (data: R[T]) => void) {
    const callbacks = this.subscriptions.get(topic);
    if (!callbacks) return;

    callbacks.delete(callback);

    if (callbacks.size === 0) {
      this.subscriptions.delete(topic);
    }
  }

  unsubscribeAll() {
    this.subscriptions.clear();
  }

  publish<T extends keyof R>(topic: T, data: R[T]) {
    const callbacks = this.subscriptions.get(topic);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}
