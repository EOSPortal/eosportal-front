const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
// create the express app
const app = express()
// create middleware to handle the serving the app
app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )
// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
		res.sendFile(__dirname + '/dist/index.html')
})
// Create default port to serve the app on
const port = process.env.PORT || 5000
app.listen(port)
// Log to feedback that this is actually running
console.log('Server started on port ' + port)