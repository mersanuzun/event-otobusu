var EventOtobusu = function() {
    var that = this instanceof EventOtobusu ? this : {};
    var subscriptions = {};

    that.subscribe = function(type, handler) {
        if (type in subscriptions) {
            subscriptions[type].push(handler);
        } else {
            subscriptions[type] = [handler];
        }

        return that.unsubscribe.bind(this, type, handler);
    };

    that.publish = function(type, arg) {
        const handlers = subscriptions[type] || [];

        handlers.forEach(handler => {
            if (typeof handler === 'function') {
                handler(arg)
            } 
        });
    };

    that.unsubscribe = function(type, handler) {
        if (type in subscriptions) {
            subscriptions[type] = subscriptions[type].filter(registeredHandler => registeredHandler !== handler);
        }
    };

    that.getAllEvents = function() {
        return subscriptions;
    }

    return that;
}

module.exports = EventOtobusu;