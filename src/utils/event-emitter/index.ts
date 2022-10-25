export type Handler<EventPayload> = (payload: EventPayload) => void;

abstract class EventEmitter<EventPayload, Events extends string> {
  protected handlers: { [K in Events]?: Handler<EventPayload>[] } = {};

  public subscribe(event: Events, handler: Handler<EventPayload>) {
    this.handlers[event] ??= [];
    this.handlers[event]!.push(handler);

    return {
      unsubscribe: () => {
        this.handlers[event] = this.handlers[event]?.filter(
          existingHandler => existingHandler !== handler
        );
      },
    };
  }

  public unsubscribe(event: Events, handler: Handler<EventPayload>) {
    const handlers = this.handlers[event];
    if (!handlers) return console.warn(`No handlers registered for ${event} event`);

    const indexOfHandler = handlers.indexOf(handler);
    if (indexOfHandler === -1)
      return console.warn(
        `Cant' unsubscribe the handler for the ${event} event: handler not found`
      );

    handlers.splice(indexOfHandler, 1);
  };

  public emit(event: Events, payload: EventPayload) {
    const handlers = this.handlers[event];

    if (!handlers) {
      return console.warn(`No handlers registered for "${event}" event`);
    }

    handlers.forEach(handler => handler(payload));
  };

  protected destroy() {
    this.handlers = {};
  };
}

export default EventEmitter;
