var https = require('https');
var ws = require('ws');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;


var options = {
  key: fs.readFileSync("../ryans-key.pem"),
  cert: fs.readFileSync("../ryans-cert.pem")
};

var server = https.createServer(options, function (req, res) {
  // res.writeHead(403); //403即可  
  // res.end("This is a  WebSockets server!\n");
  fs.createReadStream("./index.html").pipe(res)
}).listen(65500);

var wss = new ws.Server({
  server: server,
});

// wss.on('connection', (socket) => {
//   console.log(socket)
// })

wss.on('connection', function (conn) {
  console.log(wss);
  // console.log(conn)
  // write to file
  // fs.writeFile('log.txt', JSON.stringify(conn), (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });


  conn.on('message', function (message) {
    console.log(message)
    // conn.send(message + ' from server')

    // 没用
    // console.log(wss.clients.length);
    
    // broadcast

    let Msg = JSON.parse(message)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(`[${Msg.from}] ${Msg.content}`);
      }
    });
  });
  conn.on('error', function () {
    // console.log(Array.prototype.join.call(arguments, ", "));
  });
  conn.on('close', function () {
    console.log('someone offline')
  });
});


// server.listen(port, hostname, () => {
//   console.log(`Server running at https://${hostname}:${port}/`);
// });