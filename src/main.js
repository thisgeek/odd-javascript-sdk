(function () {
	var Client = require('./client');

	if (typeof window !== 'undefined') {
		window.Odd = window.Odd || {};
		window.Odd.Client = window.Odd.Client || Client;
	}

	if (typeof module !== 'undefined') {
		module.exports = Client;
	}
})();
