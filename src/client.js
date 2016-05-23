var Promise = require('bluebird');
var superagent = require('superagent');
var superagentPrefix = require('superagent-prefix');

var ENDPOINT = 'http://oddworks.io';
var JWT_HEADER = 'x-access-token';
var TYPES = ['videos', 'collections', 'views'];

function Client(options) {
	options = options || {};

	if (!options.jwt) {
		throw new Error('options.jwt is required');
	}

	return this;
}
module.exports = Client;

TYPES.forEach(function (type) {
	Client.prototype['get' + type.charAt(0).toUpperCase() + type.slice(1)] = function (id) {
		return new Promise(function (resolve, reject) {
			superagent
				.get('/' + type + ((id) ? '/' + id : ''))
				.use(superagentPrefix(this.options.endpoint || ENDPOINT))
				.set(this.options.endpoint || JWT_HEADER, this.options.jwt)
				.set('Accept', 'application/json')
				.end(function (err, res) {
					if (err) {
						return reject(err);
					}

					resolve(res);
				});
		});
	};
});
