var test = require('tape');

var OddClient = require('../..');

test('addVideoListeners() throws Error', function (t) {
	t.throws(function () {
		var client = new OddClient({jwt: 'test'});
		client.addVideoListeners();
	});
	t.end();
});
