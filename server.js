const http = require('http')
const PORT = 5001;
const fs = require('fs')
const path = require('path')
const app = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      const homePath = path.join(__dirname, 'src/index.html')
      fs.readFile(homePath, 'utf-8', (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>Error loading home page</h1>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content)
        }
      })
      break;
    case '/about':
      const aboutPath = path.join(__dirname, 'src/about.html')
      fs.readFile(aboutPath, 'utf-8', (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>Error loading about page</h1>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content)
        }
      })
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end("<h1>404 page not found</h1>")
  }
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
