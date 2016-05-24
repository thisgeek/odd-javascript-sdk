var Promise = require('bluebird');
var superagent = require('superagent');
var superagentPrefix = require('superagent-prefix');
var uuid = require('uuid');

var ENDPOINT = 'http://oddworks.io';
var JWT_HEADER = 'x-access-token';
var TYPES = ['videos', 'collections', 'views'];
var DATA_ATTR = 'data-odd-id';
var LOCAL_STORAGE_USER_KEY = 'odd-user-id';

function Client(options) {
	this.options = options || {};

	if (!this.options.jwt) {
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

Client.prototype.addVideoListeners = function () {
	this.userId = this.options.userId || localStorage.getItem('odd-user-id') || uuid.v4();
	localStorage.setItem('odd-user-id', this.userId);
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
