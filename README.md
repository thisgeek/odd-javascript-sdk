# JavaScript SDK for Oddworks

![oddworks-javascript-sdk](https://cloud.githubusercontent.com/assets/483829/15481904/ef21b22a-20fa-11e6-862b-181d0a7e97cc.png)

[![Build Status](https://travis-ci.org/oddnetworks/odd-javascript-sdk.svg?branch=master)](https://travis-ci.org/oddnetworks/odd-javascript-sdk)
[![slack.oddnetworks.com](http://slack.oddnetworks.com/badge.svg)](http://slack.oddnetworks.com)

An [Oddworks](https://github.com/oddnetworks/oddworks) client SDK for [Node.js](http://nodejs.org) and the browser. Check out [Odd Networks](https://www.oddnetworks.com/) for more information.

* Create a new streaming app on the web.
* Augment your existing website or Node.js app with video streaming content from [Oddworks](https://github.com/oddnetworks/oddworks).
* Take down the establishment.

_Become your own video distribution channel!_

Support for Node.js, Browserify, and Webpack.

## Installing

```
$ npm install --save odd-javascript-sdk
```

## Using

```js
const OddClient = require('odd-javascript-sdk');
const client = new OddClient({jwt: 'YOUR JWT HERE'});

client
  .getVideos()
  .then(videos => {
    console.log(videos);
  })
  .catch(err => {
    console.error(err);
  });
```

## Development

- [XO](https://www.npmjs.com/package/xo) for linting
- [tape](https://www.npmjs.com/package/tape) for unit testing
- [tape-run](https://www.npmjs.com/package/tape-run) for headless browser testing
- [Browserify](https://www.npmjs.com/package/browserify) for front-end bundling

```
$ npm install
$ npm test
```

## Community

Get updates on Odd Network's development and chat with the project maintainers and community members.

* Follow [@oddnetworks on Twitter](https://twitter.com/OddNetworks).
* Join [the official Slack room](http://slack.oddnetworks.com/).
* Submit an [issue](https://github.com/oddnetworks/oddworks/issues).
* Check out the [API sample responses](https://www.oddnetworks.com/documentation/oddworks/).
* Read and subscribe to [The Official Odd Networks Blog](http://blog.oddnetworks.com/).

## License

Apache 2.0 © [Odd Networks](http://oddnetworks.com)
