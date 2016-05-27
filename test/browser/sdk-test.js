var test = require('tape');

var OddClient = require('../..');

test('addVideoListeners() doesn\'t throw Error', function (t) {
	t.doesNotThrow(function () {
		var client = new OddClient({jwt: 'test'});
		client.addVideoListeners();
	});
	t.end();
});
