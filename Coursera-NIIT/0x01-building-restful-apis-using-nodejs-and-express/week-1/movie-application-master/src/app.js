// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  if (req.url == '/api/v1/movies' && req.method == 'GET') {
    moviesService.getMovies((err, result) => {
      if (err) {
        res.writeHead(400, {
          "content-type": "application/json"
        })
        res.end(JSON.stringify(err))
      } else {
        res.writeHead(200, {
          "content-type": "application/json"
        })
        res.end(JSON.stringify(result))
      }
    })
  } else if (req.url.match(/\/api\/v1\/movies\/\d+$/) && req.method == 'GET') {
    let movieId = req.url.split('/')[4]
    moviesService.getMoviesById(movieId, (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end("Movie not found")
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(JSON.stringify(result))
      }
    })
  } else if (req.url == '/api/v1/movies' && req.method == 'POST') {
    let req_body = await getRequestData(req);
    moviesService.saveMovie(JSON.parse(req_body), (err, result) => {
      if (err) {
        res.writeHead(400, {
          "content-type": "application/json"
        })
        res.end("Movie already exists")
      } else {
        res.writeHead(200, {
          "content-type": "application/json"
        })
        res.end(JSON.stringify(result))
      }
    })
  } else if (req.url.match(/\/api\/v1\/movies\/\d+$/) && req.method == 'PUT') {
    let movieId = req.url.split('/')[4]
    let req_body = await getRequestData(req);
    moviesService.updateMovie(movieId, JSON.parse(req_body), (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end("Movie not found")
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(JSON.stringify(result))
      }
    })
  } else if (req.url.match(/\/api\/v1\/movies\/\d+$/) && req.method == 'DELETE') {
    let movieId = req.url.split('/')[4]
    moviesService.deleteMovieById(movieId, (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end("Movie not found")
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(JSON.stringify(result))
      }
    })    

  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
})
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
