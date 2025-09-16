const http = require('http')
const PORT = 5001;
const fs = require('fs')
const path = require('path')

// Ensure src directory and HTML files exist
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
}
const indexPath = path.join(srcDir, 'index.html');
const aboutPath = path.join(srcDir, 'about.html');
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, '<h1>Home Page</h1>');
}
if (!fs.existsSync(aboutPath)) {
  fs.writeFileSync(aboutPath, '<h1>About Page</h1>');
}

const app = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      fs.readFile(indexPath, 'utf-8', (err, content) => {
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
