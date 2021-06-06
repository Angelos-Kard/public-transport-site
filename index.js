const app = require('./app');
const port = process.env.PORT || '3000';

//Starting the server
const server = app.listen(port, () => {
	console.log("Listening to port " + port)
});

//Shutting down the server
process.on('SIGINT', function() {
	console.log( "\nShutting down server (Ctrl+C)..." );
	// some other closing procedures go here
	process.exit(1);
  });