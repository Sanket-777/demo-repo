const http = require("http"); //
const path = require("path"); // for paths
const fs = require("fs"); // for file system

const Server = http.createServer((req, res) => {
  //   if (req.url == "/") {
  //     fs.readFile(
  //       path.join(__dirname,'public', 'index.html'), (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-type': 'text/html' });
  //         res.end(content);
  //       });
  //     res.end("<h1>Home Page </h1>");
  //   } else if (req.url == "/about") {

  //     fs.readFile(
  //       path.join(__dirname, 'public', 'about.html'), (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-type': 'text/html' });
  //         res.end(content);
  //       });
  //     res.end("<h1>ABout Page </h1>");
  //   }

  //get path of file dynamically
  let filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  //get extension of file dynamically
  let extname = path.extname(filepath);
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
  }

  //read file dynamically
  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        //ENONENT for page not found
        //page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //Server Error
        res.writeHead(500, { "Content-type": "text/html" });
        res.end(`Server Error`);
      }
    } else {
      //SUccess
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf8");
    }
  });
});
const PORT = process.env.PORT || 5000;

Server.listen(PORT, console.log(`Server Running...on ${PORT}`));
