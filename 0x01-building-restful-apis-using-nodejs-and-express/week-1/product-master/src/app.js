//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  if (req.url == '/api/v1/products' && req.method == 'GET') {
    let allProducts = productsService.getProducts()
    res.writeHead(200, {
      'content-type': 'application/json'
    })
    res.end(allProducts)
  } else if (req.url.match(/\/api\/v1\/products\/\d+$/) && req.method == 'GET') {
    let prodId = req.url.split('/')[4]
    productsService.getProductsById(prodId, (err, result) => {
      if (err) {
        res.writeHead(404, {
          'content-type': 'application/json'
        })
        res.end("The request product is not available")
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(result)
      }
    })

  } else if (req.url == '/api/v1/products' && req.method == 'POST') {
    try {
      let req_body = await getRequestData(req);
      let result = productsService.saveProduct(JSON.parse(req_body), (err, result) => {
      if (err) {
        res.writeHead(400, {
            'content-type': 'application/json'
        })
        res.end(err)
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(result);
      }
      });
    } catch {
      res.writeHead(500, {
        'content-type': 'application/json'
      })
      res.end("An unexpected error occurred")
    }
  } else if (req.url.match(/\/api\/v1\/products\/\d+$/) && req.method == 'PUT') {
    try {
      let prodId = req.url.split('/')[4]
      let req_body = await getRequestData(req);
      let result = productsService.updateProduct(prodId, JSON.parse(req_body), (err, result) => {
      if (err) {
        res.writeHead(400, {
            'content-type': 'application/json'
        })
        res.end(err)
      } else {
        res.writeHead(200, {
          'content-type': 'application/json'
        })
        res.end(result);
      }
      });
    } catch {
      res.writeHead(500, {
        'content-type': 'application/json'
      })
      res.end("An unexpected error occurred")
    }
  } else if (req.url.match(/\/api\/v1\/products\/\d+$/) && req.method == 'DELETE') {
    let prodId = req.url.split('/')[4]
    let result = productsService.deleteProduct(prodId, (err, result) => {
    if (err) {
      res.writeHead(400, {
          'content-type': 'application/json'
      })
      res.end(err)
    } else {
      res.writeHead(200, {
        'content-type': 'application/json'
      })
      res.end(result);
    }
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})