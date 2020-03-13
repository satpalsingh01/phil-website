const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
var nodemailer = require('nodemailer');

// Use Routes
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', '*');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.urlencoded({ extended: false })) 


app.post('/send-contact-us-mail', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'englishhsln@gmail.com',
      pass: 'intrictec@VIRA'
    }
  });

  var mailOptions = {
    from: req.body.email,
    to: 'satpals.bavnsofts@gmail.com',
    subject: req.body.subject,
    html: '<p>User Name: '+req.body.user_name+'</p><p>User Email: '+req.body.email+'</p><p>Subject: '+req.body.subject+'</p><p>Message: '+req.body.message+'</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send('error -'+error)
    } else {
      res.send('success')
    }
  });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server started on port " + port));
