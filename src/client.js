var LRUCache = require('tiny-lru-cache');
var Promise = require('bluebird');
var superagent = require('superagent');
var uuid = require('uuid');

var ENDPOINT = 'http://oddworks.io/';
var JWT_HEADER = 'x-access-token';
var TYPES = ['videos', 'collections', 'views'];
var DATA_ATTR = 'data-odd-id';
var LOCAL_STORAGE_USER_KEY = 'odd-user-id';

function Client(options) {
	this.options = options || {};

	if (!this.options.jwt) {
		throw new Error('options.jwt is required');
	}

	this.cache = new LRUCache(this.options.cacheSize || 100);

	return this;
}
module.exports = Client;

TYPES.forEach(function (type) {
	Client.prototype['get' + type.charAt(0).toUpperCase() + type.slice(1)] = function (id) {
		return new Promise(function (resolve, reject) {
			var url = (this.options.endpoint || ENDPOINT) + type + ((id) ? '/' + id : '');
			var resource = this.cache.get(url);

			if (resource) {
				return resolve(resource.body, resource.res);
			}

			superagent
				.get(url)
				.set(JWT_HEADER, this.options.jwt)
				.set('Accept', 'application/json')
				.end(function (err, res) {
					if (err) {
						return reject(err);
					}

					this.cache.set(url, {body: res.body, res: res});
					resolve(res.body, res);
				});
		}.bind(this));
	};
});

Client.prototype.getConfig = function () {
	return new Promise((resolve, reject) => {
		superagent
			.get((this.options.endpoint || ENDPOINT) + 'config')
			.set(JWT_HEADER, this.options.jwt)
			.set('Accept', 'application/json')
			.end(function (err, res) {
				if (err) {
					return reject(err);
				}

				resolve(res.body, res);
			});
	});
};

Client.prototype.addVideoListeners = function () {
	if (isNode()) {
		throw new Error('addVideoListeners() not implemented for Node.js');
	}

	this.userId = this.options.userId || localStorage.getItem(LOCAL_STORAGE_USER_KEY) || uuid.v4();
	localStorage.setItem(LOCAL_STORAGE_USER_KEY, this.userId);

	var allVideos = Array.prototype.slice.call(document.getElementsByTagName('video'));
	allVideos.forEach(function (video, index) {
		var oddId = video.getAttribute(DATA_ATTR);
		if (oddId) {
			addVideoListeners(video, this.userId);
		} else {
			delete allVideos[index];
		}
	}.bind(this));

	window.addEventListener('beforeunload', function () {
		allVideos.forEach(function (video) {
			var id = video.getAttribute(DATA_ATTR);
			console.log(this.userId, id, video.currentTime);
		}.bind(this));
	});
};

function addVideoListeners(video, userId) {
	var id = video.getAttribute(DATA_ATTR);

	video.addEventListener('abort', function () {
		console.log(userId, id, 'aborted', video.currentTime);
	}, true);

	video.addEventListener('ended', function () {
		console.log(userId, id, 'ended', video.currentTime);
	}, true);

	video.addEventListener('play', function () {
		console.log(userId, id, 'play', video.currentTime);
	}, true);

	video.addEventListener('pause', function () {
		console.log(userId, id, 'pause', video.currentTime);
	}, true);
}

function isNode() {
	return (typeof window === 'undefined');
}
