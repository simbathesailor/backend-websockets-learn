const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const WebSocket = require('ws');
// const passport = require('passport');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
// const strategies = require('./passport');
const error = require('../api/middlewares/error');
const { addWebSocketContext } = require('../api/middlewares/websocketcontext');
const { addDatasources } = require('../api/middlewares/datasources');
const { getAuthMiddleware } = require('../api/middlewares/auth');

// eslint-disable-next-line
const BROADCAST_AllOWED_TYPES = ['UPDATE_PRODUCT_LISTING'];

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
// app.use(passport.initialize());
// passport.use('jwt', strategies.jwt);
// passport.use('facebook', strategies.facebook);
// passport.use('google', strategies.google);

const server = http.createServer(app);

const wss = new WebSocket.Server({
	server,
	path: '/live-updates',
});

app.use(
	addWebSocketContext({
		wss,
	}),
);

app.use(addDatasources());

app.use(getAuthMiddleware());

function heartbeat() {
	this.isAlive = true;
}

const interval = setInterval(function ping() {
	// eslint-disable-next-line
	wss.clients.forEach(ws => {
		if (ws.isAlive === false) return ws.terminate();
		// eslint-disable-next-line
		ws.isAlive = false;
		ws.ping();
	});
}, 30000);

wss.on('close', function close() {
	clearInterval(interval);
});

wss.on('connection', function connection(ws) {
	// eslint-disable-next-line
	ws.isAlive = true;
	ws.on('pong', heartbeat);
	ws.on('message', function incoming(message) {
		// console.log('received: %s', message);
		ws.send(`Got your message ===> ${message}`);

		try {
			const parsedMessage = JSON.parse(message);
			const type = parsedMessage.type;

			const broadCastAllowed = BROADCAST_AllOWED_TYPES.indexOf(type) !== -1;

			if (broadCastAllowed) {
				wss.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(message, {
							binary: false,
						});
					}
				});
			}
		} catch (e) {
			console.log('Failed to send the socket message');
		}
	});

	ws.send('Welcome client');
});

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = server;
