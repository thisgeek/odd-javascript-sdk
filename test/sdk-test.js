import test from 'ava';

import OddClient from '..';

test('fails initialization with no JWT', t => {
	t.throws(() => {
		const client = new OddClient();
		client.getVideos();
	});
});

test('attaches getters for each type', t => {
	const client = new OddClient({jwt: 'my-token'});

	t.truthy(client.getVideos);
	t.truthy(client.getCollections);
	t.truthy(client.getViews);
});
