const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const { parse } = require('querystring');
var messages = require('./messageQueue');



// Path for the background image ///////////////////////
module.exports.backgroundImageFile =  path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  //console.log('this is the request object')
  // console.log(req);

  //console.log('Serving request type ' + req.method + ' for url ' + req.url);


  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    // console.log(res);
    res.end();
    next()


  } else if ((req.method === 'GET') && (req.url.includes('swimCommand'))) {
    let message = 'left';
    // var movementArray = ['up', 'down', 'left', 'right'];
    // var randomMovement = movementArray[Math.floor(Math.random() * movementArray.length)];
    //console.log(`the random movement is ${randomMovement}`);
    res.writeHead(200, headers);
    // res.write(randomMovement);

    message = messages.dequeue()
    message = message ? message : ''

    //console.log(' message: ', message)
    res.write(message);
    res.end();
    next()


  } else if ((req.method === 'GET')  && (req.url.includes('background'))) {
    var fileData
    //run fs.readFile
    fs.readFile(module.exports.backgroundImageFile, (err, data) => {
      fileData = data;
      if (err) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        //data goes in the response object
        res.write(fileData)
        res.end();
      }
      next()
    })


  } else if ((req.method === 'POST')  && (req.url.includes('background'))) {
    console.log('IN THE POST REQUEST')
    let body = '';
    var buf = Buffer.alloc(0)
    req.on('data', chunk => {
      body += chunk //this used to be chunk.toString()
      buf = Buffer.concat([buf, chunk])
    })
    req.on('end', () => {
      //overwrite the ../background.jpg file here using fs.writeFile
      console.log('logging body.data')
      console.log(buf)

      var cleanData = multipart.getFile(buf)
      console.log('this is the cleanData')
      console.log(cleanData)
      // console.log(cleanData.data)

      fs.writeFile(module.exports.backgroundImageFile, cleanData.data, (err) => {
        if (err) {
          res.writeHead(404, headers);
          res.end();
          next();
        } else {
          console.log('the file has been saved')
          res.writeHead(201, headers);
          res.end();
          next();
        }
      })

    })

  }

};
