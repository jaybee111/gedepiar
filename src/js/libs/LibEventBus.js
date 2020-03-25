export default class LibEventBus {
  constructor() {
    this.events = [];
  }

  subscribe(event, listener) {
    if (typeof this.events[event] === 'undefined') {
      this.events[event] = [];
    }

    const index = this.events[event].push(listener) - 1;

    return {
      remove() {
        delete this.events[event][index];
      },
    };
  }

  publish(event, data) {
    if (typeof this.events[event] === 'undefined') {
      return;
    }

    this.events[event].forEach((item) => item(data !== undefined ? data : {}));
  }
}
