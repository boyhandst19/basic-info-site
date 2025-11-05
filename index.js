const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath;
  let statusCode = 200;

  switch (req.url) {
    case '/':
      filePath = 'pages/index.html';
      break;
    case '/about':
      filePath = 'pages/about.html';
      break;
    case '/contact-me':
      filePath = 'pages/contact-me.html';
      break;
    default:
      filePath = 'pages/404.html';
      statusCode = 404;
      break;
  }

  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      // If file not found or error, send a simple 500 response
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});