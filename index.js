const app = require('./app');
const port = process.env.PORT || '3000';

const server = app.listen(port, () => {
	console.log("Listening to port " + port)
});

process.on('SIGINT', function() {
	console.log( "\nShutting down server (Ctrl+C)..." );
	// some other closing procedures go here
	process.exit(1);
  });