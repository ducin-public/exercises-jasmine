/**********************************************************
Implement a simple Publisher-Subscriber

- allows to register event listeners
- publishes messages to multiple listeners
- multiple channels supported
- a message is a single item (a primitive, object, array, but just 1 item)
- synchronous listener invoking

API:
- constructor: ee = new PubSub()
- publish: ee.publish(CHANNEL, ITEM)
- subscribe: ee.subscribe(CHANNEL, LISTENER)
	- alias: ee.on(CHANNEL, LISTENER)
- unsubscribe: ee.unsubscribe(CHANNEL, LISTENER)
	- alias: ee.off(CHANNEL, LISTENER)

// for a real world implementation of an EventEmitter/PubSub, compare with: https://github.com/mroderick/PubSubJS
*/

export class PubSub {
  // implement here
}
