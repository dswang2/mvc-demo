import $ from "jquery"

class EventBus {
    constructor() {
        this._event_bus = $(window);
    }

    on(eventName, fn) {
        return this._event_bus.on(eventName, fn)
    }

    off(eventName, fn) {
        return this._event_bus.off(eventName, fn);
    }

    trigger(eventName, data) {
        return this._event_bus.trigger(eventName, data);
    }

}

export default EventBus