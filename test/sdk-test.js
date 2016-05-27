var test = require('tape');

var OddClient = require('..');

test('fails initialization with no JWT', function (t) {
	t.throws(function () {
		var client = new OddClient();
		client.getVideos();
	});
	t.end();
});

test('attaches getters for each type', function (t) {
	var client = new OddClient({jwt: 'my-token'});

	t.ok(client.getConfig);
	t.ok(client.getVideos);
	t.ok(client.getCollections);
	t.ok(client.getViews);
	t.end();
});
