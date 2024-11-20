type DOMEvent = Event;
type DOMMouseEvent = MouseEvent;

declare namespace Canvas {
  export interface Event<T extends DOMEvent = DOMEvent> {
    domEvent: T;
  }

  export interface MouseEvent extends Event<DOMMouseEvent> {
    x: number;
    y: number;
  }

  export interface BaseEventMap {
    [type: string]: Event;
  }

  export type MouseEventType = "mousedown";

  export type MouseEventMap = {
    [type in MouseEventType]: MouseEvent;
  };

  export type EventMap = BaseEventMap & MouseEventMap;
}
