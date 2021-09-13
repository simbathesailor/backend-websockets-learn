const WebSocket = require('ws');

/**
 * data :  {
 *
 * type: "ACTION_TYPE",
 * payload: {
 *
 * }
 * }
 *
 * @return  {}  [return description]
 */
exports.broadcast = function broadcast({ wss, data }) {
	console.log('🚀 ~ file: index.js ~ line 15 ~ broadcast ~ wss, wss.clients', wss.clients);
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};
