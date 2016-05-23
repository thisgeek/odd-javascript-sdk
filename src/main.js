(function () {
	var Client = require('./client');

	if (typeof window !== 'undefined') {
		window.OddClient = window.OddClient || Client;
	}

	if (typeof module !== 'undefined') {
		module.exports = Client;
	}
})();
