function addWebSocketContext({ wss }) {
	return (req, res, next) => {
		req.wss = wss;
		// console.log('Adding websoket server to context');

		return next();
	};
}

exports.addWebSocketContext = addWebSocketContext;
