import { PubSub } from './pubsub';

describe('Publisher-Subscriber', () => {

	let pubsub, consumerA, consumerB, consumerC;
	beforeEach(() => {
		pubsub = new PubSub();
		consumerA = jasmine.createSpy('consumerA');
		consumerB = jasmine.createSpy('consumerB');
		consumerC = jasmine.createSpy('consumerC');
	});

	it("doesn't emit any message if there's no listener", () => {
		var message = { operation: "PROCESS"};
		pubsub.publish('operations', message);

		expect(consumerA).not.toHaveBeenCalled();
		expect(consumerB).not.toHaveBeenCalled();
		expect(consumerC).not.toHaveBeenCalled();
	});

	it('emits a message to a single listener', () => {
		pubsub.subscribe('operations', consumerA);

		var message = { operation: "PROCESS"};
		pubsub.publish('operations', message);

		expect(consumerA).toHaveBeenCalledWith(message);
		expect(consumerB).not.toHaveBeenCalled();
		expect(consumerC).not.toHaveBeenCalled();
	});

	it('emits a message to multiple listeners', () => {
		pubsub.subscribe('operations', consumerA);
		pubsub.subscribe('operations', consumerB);
		pubsub.subscribe('operations', consumerC);

		var message = { operation: "PROCESS"};
		pubsub.publish('operations', message);

		expect(consumerA).toHaveBeenCalledWith(message);
		expect(consumerB).toHaveBeenCalledWith(message);
		expect(consumerC).toHaveBeenCalledWith(message);
	});

	it('emits messages on a certain channel', () => {
		pubsub.subscribe('operations', consumerA);

		var message1 = { operation: "PROCESS"};
		pubsub.publish('operations', message1);

		var message2 = { data: "No more cookies for you!" };
		pubsub.publish('alerts', message2);

		expect(consumerA).toHaveBeenCalledWith(message1);
		expect(consumerA).not.toHaveBeenCalledWith(message2);
		expect(consumerB).not.toHaveBeenCalled(); // at all
		expect(consumerC).not.toHaveBeenCalled(); // at all
	});

	it('emits messages on multiple channels', () => {
		pubsub.subscribe('operations', consumerA);
		pubsub.subscribe('operations', consumerB);

		pubsub.subscribe('alerts', consumerB);
		pubsub.subscribe('alerts', consumerC);

		var message1 = { operation: "PROCESS"};
		pubsub.publish('operations', message1);

		var message2 = { data: "No more cookies for you!" };
		pubsub.publish('alerts', message2);

		expect(consumerA).toHaveBeenCalledWith(message1);
		expect(consumerB).toHaveBeenCalledWith(message1);
		expect(consumerC).not.toHaveBeenCalledWith(message1);
		expect(consumerA).not.toHaveBeenCalledWith(message2);
		expect(consumerB).toHaveBeenCalledWith(message2);
		expect(consumerC).toHaveBeenCalledWith(message2);
	});

	it('stops emitting messages to unsubscribed listeners', () => {
		pubsub.subscribe('operations', consumerA);

		var message1 = { operation: "PROCESS-1"};
		pubsub.publish('operations', message1);

		expect(consumerA).toHaveBeenCalledWith(message1);
		expect(consumerB).not.toHaveBeenCalledWith(message1);
		expect(consumerC).not.toHaveBeenCalledWith(message1);

		pubsub.unsubscribe('operations', consumerA);
		pubsub.subscribe('operations', consumerB);

		var message2 = { operation: "PROCESS-2"};
		pubsub.publish('operations', message2);

		expect(consumerA).not.toHaveBeenCalledWith(message2);
		expect(consumerB).toHaveBeenCalledWith(message2);
		expect(consumerC).not.toHaveBeenCalledWith(message2);

		pubsub.unsubscribe('operations', consumerB);
		pubsub.subscribe('operations', consumerC);

		var message3 = { operation: "PROCESS-3"};
		pubsub.publish('operations', message3);

		expect(consumerA).not.toHaveBeenCalledWith(message3);
		expect(consumerB).not.toHaveBeenCalledWith(message3);
		expect(consumerC).toHaveBeenCalledWith(message3);
	});

	it('supports alias methods (on, off)', () => {
		expect(consumerA).not.toHaveBeenCalled();
		pubsub.on('operations', consumerA);

		let message1 = { operation: "PROCESS-1"};
		pubsub.publish('operations', message1);

		expect(consumerA).toHaveBeenCalledWith(message1);

		pubsub.off('operations', consumerA);

		let message2 = { operation: "PROCESS-2"};
		pubsub.publish('operations', message2);

		expect(consumerA).not.toHaveBeenCalledWith(message2);
	});

	it('emits last message on a given channel even if the listener came later than message was sent (publish last)', () => {
		expect(consumerA).not.toHaveBeenCalled();

		let message = { operation: "PROCESS"};
		pubsub.publish('operations', message);

		pubsub.subscribe('operations', consumerA);
		expect(consumerA).toHaveBeenCalledWith(message);
	});
});
