const EventOtobusu = require('../src/eventOtubusu');

describe('EventOtobusu', () => {
    let eventOtobusu;

    beforeEach(() => {
        eventOtobusu = new EventOtobusu();
    });

    describe('subscribe method', () => {
        it('should create a array and push the handler to it if there is no a subscriptions with given event type', () => {
            const handler = () => {};

            eventOtobusu.subscribe('new', handler);

            expect(eventOtobusu.getAllEvents().new).toEqual([handler]);
        });

        it('should push the handler to own handlers array if there is a subscriptions with given event type', () => {
            const oldHandler = () => {};
            const handler = () => {};

            eventOtobusu.subscribe('old', oldHandler);
            eventOtobusu.subscribe('old', handler);

            expect(eventOtobusu.getAllEvents().old).toEqual([oldHandler, handler]);
        });

        it('should return unsubscribe method', () => {
            const handler = () => {};
            const mockedUnsubscribe = () => {
                expect(1).toBe(1);
            };

            eventOtobusu.unsubscribe = mockedUnsubscribe;

            const unsubscribe = eventOtobusu.subscribe('test', handler);

            unsubscribe();
        });
    });

    describe('publish method', () => {
        it('should execute handler which which owns to given event type', () => {
            const handlerArg = { name: 'test' };
            const handler = (arg) => {
                expect(arg).toEqual(handlerArg)
            };

            eventOtobusu.subscribe('test', handler);

            eventOtobusu.publish('test', handlerArg);
        });
    });

    describe('unsubscribe method', () => {
        it('should delete handler which owns to given event type', () => {
            const event1Handler1 = () => 1;
            const event1Handler2 = () => 1.1;
            const event2Handler1 = () => 2;

            eventOtobusu.subscribe('event1', event1Handler1);
            eventOtobusu.subscribe('event1', event1Handler2);
            eventOtobusu.subscribe('event2', event2Handler1);
            
            eventOtobusu.unsubscribe('event1', event1Handler1);

            expect(eventOtobusu.getAllEvents()).toEqual({
                event1: [event1Handler2],
                event2: [event2Handler1],
            });
        });

        it('should not delete any handler which does not own to given event type', () => {
            const event1Handler1 = () => 1;
            const event1Handler2 = () => 1.1;
            const event2Handler1 = () => 2;

            eventOtobusu.subscribe('event1', event1Handler1);
            eventOtobusu.subscribe('event1', event1Handler2);
            eventOtobusu.subscribe('event2', event2Handler1);
            
            eventOtobusu.unsubscribe('event3', event1Handler1);

            expect(eventOtobusu.getAllEvents()).toEqual({
                event1: [event1Handler1, event1Handler2],
                event2: [event2Handler1],
            });
        });
    });

    describe('getAllEvents method', () => {
        it('should return subscriptions object', () => {
            const handler1 = () => 1;
            const handler2 = () => 2;

            eventOtobusu.subscribe('event1', handler1);
            eventOtobusu.subscribe('event2', handler2);

            expect(eventOtobusu.getAllEvents()).toEqual({
                event1: [handler1],
                event2: [handler2],
            });
        });
    });
});